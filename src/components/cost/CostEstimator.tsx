"use client";

import { useState } from "react";
import Card, { CardBody, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { cloudPricing } from "@/data/cloud-services";
import { formatCurrency, getProviderColor } from "@/lib/utils";
import { DollarSign, Plus, Trash2, Calculator } from "lucide-react";
import ChatPanel from "@/components/chat/ChatPanel";

interface SelectedService {
  id: string;
  category: string;
  tier: string;
  quantity: number;
  hoursPerMonth: number;
}

export default function CostEstimator() {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [showChat, setShowChat] = useState(false);

  const addService = () => {
    const categories = Object.keys(cloudPricing);
    const category = categories[0];
    const tiers = Object.keys(cloudPricing[category]);
    setSelectedServices([
      ...selectedServices,
      {
        id: Math.random().toString(36).slice(2),
        category,
        tier: tiers[0],
        quantity: 1,
        hoursPerMonth: 730,
      },
    ]);
  };

  const updateService = (id: string, updates: Partial<SelectedService>) => {
    setSelectedServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const removeService = (id: string) => {
    setSelectedServices((prev) => prev.filter((s) => s.id !== id));
  };

  const calculateCosts = () => {
    const totals = { aws: 0, gcp: 0, azure: 0 };

    selectedServices.forEach((service) => {
      const pricing = cloudPricing[service.category]?.[service.tier];
      if (!pricing) return;

      const multiplier = pricing.unit.includes("hour")
        ? service.quantity * service.hoursPerMonth
        : pricing.unit.includes("GB")
        ? service.quantity
        : pricing.unit.includes("1M")
        ? service.quantity
        : service.quantity;

      totals.aws += (pricing.prices.aws || 0) * multiplier;
      totals.gcp += (pricing.prices.gcp || 0) * multiplier;
      totals.azure += (pricing.prices.azure || 0) * multiplier;
    });

    return totals;
  };

  const totals = calculateCosts();
  const cheapest = Object.entries(totals).sort(([, a], [, b]) => a - b)[0]?.[0];

  if (showChat) {
    return (
      <ChatPanel
        placeholder="Describe your infrastructure for a cost estimate..."
        welcomeMessage="Describe your infrastructure requirements and I'll provide detailed cost estimates across AWS, GCP, and Azure."
        apiEndpoint="/api/cost-estimate"
      />
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign size={18} className="text-cloud-400" />
                <h3 className="font-semibold text-white">Cloud Cost Estimator</h3>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setShowChat(true)}>
                  AI Estimate
                </Button>
                <Button size="sm" onClick={addService}>
                  <Plus size={14} />
                  Add Service
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {selectedServices.length === 0 ? (
              <div className="text-center py-8">
                <Calculator size={40} className="mx-auto text-gray-600 mb-3" />
                <p className="text-gray-400 text-sm mb-3">Add services to estimate costs across cloud providers</p>
                <Button size="sm" onClick={addService}>
                  <Plus size={14} />
                  Add First Service
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30"
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                      <select
                        value={service.category}
                        onChange={(e) => {
                          const cat = e.target.value;
                          const tiers = Object.keys(cloudPricing[cat]);
                          updateService(service.id, { category: cat, tier: tiers[0] });
                        }}
                        className="rounded-lg border border-gray-600 bg-gray-800 px-2 py-1.5 text-xs text-gray-200"
                      >
                        {Object.keys(cloudPricing).map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <select
                        value={service.tier}
                        onChange={(e) => updateService(service.id, { tier: e.target.value })}
                        className="rounded-lg border border-gray-600 bg-gray-800 px-2 py-1.5 text-xs text-gray-200"
                      >
                        {Object.keys(cloudPricing[service.category] || {}).map((tier) => (
                          <option key={tier} value={tier}>{tier}</option>
                        ))}
                      </select>
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] text-gray-500">Qty:</label>
                        <input
                          type="number"
                          value={service.quantity}
                          onChange={(e) => updateService(service.id, { quantity: Number(e.target.value) || 1 })}
                          min={1}
                          className="w-20 rounded-lg border border-gray-600 bg-gray-800 px-2 py-1.5 text-xs text-gray-200"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] text-gray-500">Hrs/mo:</label>
                        <input
                          type="number"
                          value={service.hoursPerMonth}
                          onChange={(e) => updateService(service.id, { hoursPerMonth: Number(e.target.value) || 730 })}
                          className="w-20 rounded-lg border border-gray-600 bg-gray-800 px-2 py-1.5 text-xs text-gray-200"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeService(service.id)}
                      className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Cost Summary */}
        {selectedServices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(["aws", "gcp", "azure"] as const).map((provider) => (
              <Card key={provider} className={cheapest === provider ? "border-green-500/30" : ""}>
                <CardBody>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={provider} size="md">{provider.toUpperCase()}</Badge>
                    {cheapest === provider && (
                      <Badge variant="success" size="sm">Lowest</Badge>
                    )}
                  </div>
                  <div className={`text-2xl font-bold ${getProviderColor(provider)} mb-1`}>
                    {formatCurrency(totals[provider])}
                    <span className="text-xs text-gray-500 font-normal">/month</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatCurrency(totals[provider] * 12)}/year
                  </div>
                  <div className="mt-3 space-y-1">
                    {selectedServices.map((service) => {
                      const pricing = cloudPricing[service.category]?.[service.tier];
                      if (!pricing) return null;
                      const multiplier = pricing.unit.includes("hour") ? service.quantity * service.hoursPerMonth : service.quantity;
                      const cost = (pricing.prices[provider] || 0) * multiplier;
                      return (
                        <div key={service.id} className="flex justify-between text-xs">
                          <span className="text-gray-400 truncate mr-2">{service.tier}</span>
                          <span className="text-gray-300">{formatCurrency(cost)}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {/* Pricing Reference */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-white text-sm">Pricing Reference</h3>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700/50">
                    <th className="text-left py-2 px-3">Service</th>
                    <th className="text-left py-2 px-3">Tier</th>
                    <th className="text-right py-2 px-3">AWS</th>
                    <th className="text-right py-2 px-3">GCP</th>
                    <th className="text-right py-2 px-3">Azure</th>
                    <th className="text-left py-2 px-3">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(cloudPricing).map(([category, tiers]) =>
                    Object.entries(tiers).map(([tier, data], i) => (
                      <tr key={`${category}-${tier}`} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        {i === 0 && (
                          <td className="py-2 px-3 text-gray-300 font-medium" rowSpan={Object.keys(tiers).length}>
                            {category}
                          </td>
                        )}
                        <td className="py-2 px-3 text-gray-400">{tier}</td>
                        <td className="py-2 px-3 text-right text-[#FF9900]">${data.prices.aws}</td>
                        <td className="py-2 px-3 text-right text-[#4285F4]">${data.prices.gcp}</td>
                        <td className="py-2 px-3 text-right text-[#0078D4]">${data.prices.azure}</td>
                        <td className="py-2 px-3 text-gray-500">{data.unit}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
