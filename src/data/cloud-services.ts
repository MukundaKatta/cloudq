import type { ServiceComparisonEntry } from "@/types";

export const serviceComparisons: Record<string, ServiceComparisonEntry[]> = {
  Compute: [
    {
      aws: "EC2",
      gcp: "Compute Engine",
      azure: "Virtual Machines",
      description: "Virtual machine instances for general workloads",
      keyDifferences: [
        "AWS offers the widest instance selection (700+)",
        "GCP provides sustained use discounts automatically",
        "Azure has strong Windows workload integration",
      ],
    },
    {
      aws: "Lambda",
      gcp: "Cloud Functions",
      azure: "Azure Functions",
      description: "Serverless compute for event-driven code",
      keyDifferences: [
        "Lambda supports the most runtimes natively",
        "Cloud Functions v2 uses Cloud Run under the hood",
        "Azure Functions support Durable Functions for orchestration",
      ],
    },
    {
      aws: "ECS / EKS",
      gcp: "GKE",
      azure: "AKS",
      description: "Container orchestration services",
      keyDifferences: [
        "EKS charges $0.10/hr per cluster; ECS is free for the control plane",
        "GKE Autopilot manages node pools automatically",
        "AKS control plane is free of charge",
      ],
    },
    {
      aws: "Fargate",
      gcp: "Cloud Run",
      azure: "Container Apps",
      description: "Serverless container execution",
      keyDifferences: [
        "Fargate works with ECS and EKS",
        "Cloud Run supports any container with HTTP endpoint",
        "Container Apps support Dapr microservice building blocks",
      ],
    },
  ],
  Storage: [
    {
      aws: "S3",
      gcp: "Cloud Storage",
      azure: "Blob Storage",
      description: "Object storage for unstructured data",
      keyDifferences: [
        "S3 offers the most storage classes (8 tiers)",
        "Cloud Storage has unified API across classes",
        "Blob Storage integrates with Azure Data Lake",
      ],
    },
    {
      aws: "EBS",
      gcp: "Persistent Disk",
      azure: "Managed Disks",
      description: "Block storage for VM instances",
      keyDifferences: [
        "EBS volumes are AZ-scoped",
        "Persistent Disk can attach read-only to multiple VMs",
        "Managed Disks support shared disks across VMs",
      ],
    },
    {
      aws: "EFS",
      gcp: "Filestore",
      azure: "Azure Files",
      description: "Managed file storage (NFS/SMB)",
      keyDifferences: [
        "EFS scales automatically with no provisioning",
        "Filestore supports NFSv3 with high throughput",
        "Azure Files supports both SMB and NFS protocols",
      ],
    },
  ],
  Database: [
    {
      aws: "RDS",
      gcp: "Cloud SQL",
      azure: "Azure SQL Database",
      description: "Managed relational databases",
      keyDifferences: [
        "RDS supports 6 database engines",
        "Cloud SQL supports MySQL, PostgreSQL, SQL Server",
        "Azure SQL has built-in AI-powered tuning",
      ],
    },
    {
      aws: "DynamoDB",
      gcp: "Firestore / Bigtable",
      azure: "Cosmos DB",
      description: "NoSQL databases",
      keyDifferences: [
        "DynamoDB offers single-digit ms latency with DAX",
        "Firestore is document-based; Bigtable is wide-column",
        "Cosmos DB supports 5 consistency models and multiple APIs",
      ],
    },
    {
      aws: "Aurora",
      gcp: "AlloyDB / Spanner",
      azure: "Cosmos DB (relational)",
      description: "Cloud-native databases",
      keyDifferences: [
        "Aurora is MySQL/PostgreSQL compatible with 5x throughput",
        "Spanner offers global strong consistency",
        "AlloyDB combines PostgreSQL with Google AI infrastructure",
      ],
    },
    {
      aws: "ElastiCache",
      gcp: "Memorystore",
      azure: "Azure Cache for Redis",
      description: "In-memory caching services",
      keyDifferences: [
        "ElastiCache supports Redis and Memcached",
        "Memorystore supports Redis and Memcached",
        "Azure Cache offers Enterprise tier with Redis modules",
      ],
    },
  ],
  Networking: [
    {
      aws: "VPC",
      gcp: "VPC",
      azure: "Virtual Network",
      description: "Isolated virtual networks",
      keyDifferences: [
        "AWS VPCs are regional with AZ subnets",
        "GCP VPCs are global with regional subnets",
        "Azure VNets are regional with availability zone support",
      ],
    },
    {
      aws: "Route 53",
      gcp: "Cloud DNS",
      azure: "Azure DNS",
      description: "Managed DNS services",
      keyDifferences: [
        "Route 53 includes domain registration",
        "Cloud DNS supports DNSSEC",
        "Azure DNS supports private DNS zones natively",
      ],
    },
    {
      aws: "CloudFront",
      gcp: "Cloud CDN",
      azure: "Azure CDN / Front Door",
      description: "Content delivery networks",
      keyDifferences: [
        "CloudFront integrates with Lambda@Edge",
        "Cloud CDN uses Google's global edge network",
        "Front Door combines CDN with global load balancing",
      ],
    },
    {
      aws: "ELB (ALB/NLB/GLB)",
      gcp: "Cloud Load Balancing",
      azure: "Azure Load Balancer / App Gateway",
      description: "Load balancing services",
      keyDifferences: [
        "AWS has ALB (L7), NLB (L4), GLB (L3)",
        "GCP load balancers are global by default",
        "Azure App Gateway provides WAF capabilities",
      ],
    },
  ],
  "AI/ML": [
    {
      aws: "SageMaker",
      gcp: "Vertex AI",
      azure: "Azure ML",
      description: "End-to-end ML platforms",
      keyDifferences: [
        "SageMaker has built-in algorithms and JumpStart",
        "Vertex AI integrates with BigQuery ML",
        "Azure ML has AutoML and designer for no-code",
      ],
    },
    {
      aws: "Bedrock",
      gcp: "Vertex AI (Gemini)",
      azure: "Azure OpenAI Service",
      description: "Foundation model / LLM services",
      keyDifferences: [
        "Bedrock supports multiple model providers",
        "Vertex AI offers Gemini models natively",
        "Azure OpenAI provides exclusive GPT-4 access",
      ],
    },
  ],
  Security: [
    {
      aws: "IAM",
      gcp: "Cloud IAM",
      azure: "Entra ID (Azure AD)",
      description: "Identity and access management",
      keyDifferences: [
        "AWS IAM policies are JSON-based and very granular",
        "GCP IAM uses predefined roles per service",
        "Azure AD integrates with Microsoft 365 ecosystem",
      ],
    },
    {
      aws: "KMS",
      gcp: "Cloud KMS",
      azure: "Key Vault",
      description: "Key management and encryption",
      keyDifferences: [
        "AWS KMS integrates with all AWS services",
        "Cloud KMS supports external key management (EKM)",
        "Key Vault manages keys, secrets, and certificates",
      ],
    },
    {
      aws: "GuardDuty",
      gcp: "Security Command Center",
      azure: "Microsoft Defender for Cloud",
      description: "Threat detection and security monitoring",
      keyDifferences: [
        "GuardDuty uses ML for anomaly detection",
        "SCC provides asset inventory and vulnerability scanning",
        "Defender integrates with Microsoft Sentinel SIEM",
      ],
    },
  ],
  Monitoring: [
    {
      aws: "CloudWatch",
      gcp: "Cloud Monitoring",
      azure: "Azure Monitor",
      description: "Infrastructure and application monitoring",
      keyDifferences: [
        "CloudWatch supports custom metrics and dashboards",
        "Cloud Monitoring integrates with Prometheus",
        "Azure Monitor includes Application Insights for APM",
      ],
    },
    {
      aws: "CloudTrail",
      gcp: "Cloud Audit Logs",
      azure: "Activity Log",
      description: "API activity and audit logging",
      keyDifferences: [
        "CloudTrail logs all API calls across AWS services",
        "Cloud Audit Logs are always-on and cannot be disabled",
        "Activity Log retains 90 days by default",
      ],
    },
  ],
};

export const cloudPricing: Record<string, Record<string, { unit: string; prices: Record<string, number> }>> = {
  "Virtual Machines (general, per hour)": {
    "2 vCPU, 8 GB RAM": {
      unit: "per hour",
      prices: { aws: 0.0928, gcp: 0.0835, azure: 0.096 },
    },
    "4 vCPU, 16 GB RAM": {
      unit: "per hour",
      prices: { aws: 0.1856, gcp: 0.167, azure: 0.192 },
    },
    "8 vCPU, 32 GB RAM": {
      unit: "per hour",
      prices: { aws: 0.3712, gcp: 0.334, azure: 0.384 },
    },
    "16 vCPU, 64 GB RAM": {
      unit: "per hour",
      prices: { aws: 0.7424, gcp: 0.668, azure: 0.768 },
    },
  },
  "Object Storage (per GB/month)": {
    "Standard": {
      unit: "per GB/month",
      prices: { aws: 0.023, gcp: 0.02, azure: 0.018 },
    },
    "Infrequent Access": {
      unit: "per GB/month",
      prices: { aws: 0.0125, gcp: 0.01, azure: 0.01 },
    },
    "Archive": {
      unit: "per GB/month",
      prices: { aws: 0.004, gcp: 0.004, azure: 0.002 },
    },
  },
  "Managed Database (per hour)": {
    "2 vCPU, 8 GB (PostgreSQL)": {
      unit: "per hour",
      prices: { aws: 0.171, gcp: 0.155, azure: 0.178 },
    },
    "4 vCPU, 16 GB (PostgreSQL)": {
      unit: "per hour",
      prices: { aws: 0.342, gcp: 0.31, azure: 0.356 },
    },
    "8 vCPU, 32 GB (PostgreSQL)": {
      unit: "per hour",
      prices: { aws: 0.684, gcp: 0.62, azure: 0.712 },
    },
  },
  "Serverless Functions": {
    "Per million invocations": {
      unit: "per 1M invocations",
      prices: { aws: 0.2, gcp: 0.4, azure: 0.2 },
    },
    "Per GB-second": {
      unit: "per GB-s",
      prices: { aws: 0.0000166667, gcp: 0.0000025, azure: 0.000016 },
    },
  },
  "Load Balancer (per hour)": {
    "Application Load Balancer": {
      unit: "per hour",
      prices: { aws: 0.0225, gcp: 0.025, azure: 0.025 },
    },
    "Network Load Balancer": {
      unit: "per hour",
      prices: { aws: 0.0225, gcp: 0.025, azure: 0.005 },
    },
  },
  "Data Transfer (per GB, outbound)": {
    "First 10 TB/month": {
      unit: "per GB",
      prices: { aws: 0.09, gcp: 0.12, azure: 0.087 },
    },
    "Next 40 TB/month": {
      unit: "per GB",
      prices: { aws: 0.085, gcp: 0.11, azure: 0.083 },
    },
  },
  "Kubernetes (per cluster/hour)": {
    "Control Plane": {
      unit: "per hour",
      prices: { aws: 0.1, gcp: 0.1, azure: 0.0 },
    },
  },
};

export const securityRules = [
  {
    id: "SEC001",
    pattern: /public[_-]?access.*true|acl.*public/i,
    severity: "critical" as const,
    title: "Public Access Enabled",
    description: "Resource has public access enabled which exposes it to the internet",
    recommendation: "Disable public access and use VPC endpoints or private links for access",
    reference: "CIS Benchmark 2.1.1",
  },
  {
    id: "SEC002",
    pattern: /encryption.*false|encrypted.*false|kms_key_id\s*=\s*""/i,
    severity: "high" as const,
    title: "Encryption Not Enabled",
    description: "Resource does not have encryption at rest enabled",
    recommendation: "Enable encryption using KMS or provider-managed keys",
    reference: "CIS Benchmark 2.1.2",
  },
  {
    id: "SEC003",
    pattern: /0\.0\.0\.0\/0|:\/0|\*\.\*\.\*\.\*/i,
    severity: "high" as const,
    title: "Overly Permissive Network Rule",
    description: "Network rule allows traffic from any IP address (0.0.0.0/0)",
    recommendation: "Restrict CIDR ranges to known IP addresses or ranges",
    reference: "CIS Benchmark 4.1",
  },
  {
    id: "SEC004",
    pattern: /password\s*=\s*["'][^"']+["']|secret\s*=\s*["'][^"']+["']/i,
    severity: "critical" as const,
    title: "Hardcoded Credentials",
    description: "Credentials are hardcoded in the configuration",
    recommendation: "Use a secrets manager (AWS Secrets Manager, GCP Secret Manager, Azure Key Vault)",
    reference: "OWASP A07:2021",
  },
  {
    id: "SEC005",
    pattern: /versioning\s*\{[\s\S]*?enabled\s*=\s*false/i,
    severity: "medium" as const,
    title: "Versioning Disabled",
    description: "Object versioning is not enabled on storage resource",
    recommendation: "Enable versioning to protect against accidental deletion",
    reference: "CIS Benchmark 2.1.3",
  },
  {
    id: "SEC006",
    pattern: /logging\s*\{[\s\S]*?enabled\s*=\s*false|access_logs\s*\{[\s\S]*?enabled\s*=\s*false/i,
    severity: "medium" as const,
    title: "Logging Disabled",
    description: "Access logging is not enabled on this resource",
    recommendation: "Enable access logging for audit and compliance",
    reference: "CIS Benchmark 3.1",
  },
  {
    id: "SEC007",
    pattern: /ssl_policy|minimum_tls_version\s*=\s*["']TLS1_0|tls_1_0/i,
    severity: "high" as const,
    title: "Weak TLS Version",
    description: "TLS 1.0 or 1.1 is allowed which has known vulnerabilities",
    recommendation: "Enforce minimum TLS 1.2 for all connections",
    reference: "CIS Benchmark 9.2",
  },
  {
    id: "SEC008",
    pattern: /multi_az\s*=\s*false|single_az|availability_type\s*=\s*["']ZONAL/i,
    severity: "medium" as const,
    title: "Single Availability Zone",
    description: "Resource is deployed in a single AZ without redundancy",
    recommendation: "Enable multi-AZ deployment for high availability",
    reference: "AWS Well-Architected REL-9",
  },
  {
    id: "SEC009",
    pattern: /backup_retention_period\s*=\s*0|automated_backup\s*=\s*false/i,
    severity: "high" as const,
    title: "Backups Disabled",
    description: "Automated backups are not configured",
    recommendation: "Enable automated backups with appropriate retention period",
    reference: "CIS Benchmark 2.3",
  },
  {
    id: "SEC010",
    pattern: /deletion_protection\s*=\s*false|prevent_destroy\s*=\s*false/i,
    severity: "medium" as const,
    title: "Deletion Protection Disabled",
    description: "Resource can be accidentally deleted without protection",
    recommendation: "Enable deletion protection for production resources",
    reference: "AWS Well-Architected REL-8",
  },
];

export const wellArchitectedPractices = {
  "operational-excellence": [
    {
      title: "Automate Operations",
      description: "Use infrastructure as code and CI/CD pipelines for all deployments",
      checks: ["IaC templates exist", "CI/CD pipeline configured", "Runbooks documented"],
    },
    {
      title: "Monitor Everything",
      description: "Implement comprehensive monitoring, logging, and alerting",
      checks: ["Metrics dashboards exist", "Log aggregation configured", "Alerts set for SLIs"],
    },
    {
      title: "Plan for Failure",
      description: "Design and test failure scenarios with game days",
      checks: ["Chaos engineering tests", "Disaster recovery plan", "Regular DR drills"],
    },
  ],
  security: [
    {
      title: "Implement Least Privilege",
      description: "Grant only the minimum permissions required",
      checks: ["IAM roles reviewed", "No wildcard permissions", "Service accounts scoped"],
    },
    {
      title: "Encrypt Everything",
      description: "Enable encryption at rest and in transit for all data",
      checks: ["TLS 1.2+ enforced", "Storage encrypted", "Key rotation enabled"],
    },
    {
      title: "Enable Audit Logging",
      description: "Track all API calls and data access",
      checks: ["CloudTrail/Audit Logs enabled", "Log retention configured", "SIEM integration"],
    },
  ],
  reliability: [
    {
      title: "Multi-AZ Deployment",
      description: "Deploy across multiple availability zones for resilience",
      checks: ["Resources in 2+ AZs", "Auto-scaling configured", "Health checks active"],
    },
    {
      title: "Automated Backups",
      description: "Configure automated backups with tested restore procedures",
      checks: ["Backup schedules set", "Restore tested monthly", "Cross-region backups"],
    },
    {
      title: "Circuit Breakers",
      description: "Implement circuit breaker patterns for service dependencies",
      checks: ["Retry logic with backoff", "Fallback mechanisms", "Timeout configurations"],
    },
  ],
  performance: [
    {
      title: "Right-Size Resources",
      description: "Match resource allocation to actual workload requirements",
      checks: ["CPU utilization reviewed", "Memory usage optimized", "Rightsizing recommendations"],
    },
    {
      title: "Use Caching",
      description: "Implement caching at multiple layers to reduce latency",
      checks: ["CDN configured", "Application cache layer", "Database query caching"],
    },
    {
      title: "Optimize Data Transfer",
      description: "Minimize data transfer costs and latency",
      checks: ["VPC endpoints used", "Data compression enabled", "Regional data locality"],
    },
  ],
  "cost-optimization": [
    {
      title: "Use Reserved/Committed Capacity",
      description: "Commit to 1-3 year terms for predictable workloads",
      checks: ["RI coverage analyzed", "Savings plans evaluated", "Spot instances for batch"],
    },
    {
      title: "Implement Tagging Strategy",
      description: "Tag all resources for cost allocation and tracking",
      checks: ["Mandatory tags defined", "Cost allocation tags", "Unused resources tagged"],
    },
    {
      title: "Automate Shutdown",
      description: "Shut down non-production resources outside business hours",
      checks: ["Dev/staging schedules", "Lambda cleanup functions", "Budget alerts set"],
    },
  ],
  sustainability: [
    {
      title: "Optimize Utilization",
      description: "Maximize utilization of provisioned resources",
      checks: ["Average CPU > 40%", "Serverless where possible", "Batch processing optimized"],
    },
    {
      title: "Choose Efficient Regions",
      description: "Select regions with lower carbon intensity",
      checks: ["Carbon-aware region selection", "Data locality optimized", "CDN edge caching"],
    },
  ],
};

export const iacTemplates: Record<string, Record<string, string>> = {
  terraform: {
    vpc: `resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "\${var.project}-vpc"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_subnet" "public" {
  count                   = length(var.public_subnet_cidrs)
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "\${var.project}-public-\${count.index + 1}"
  }
}

resource "aws_subnet" "private" {
  count             = length(var.private_subnet_cidrs)
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "\${var.project}-private-\${count.index + 1}"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "\${var.project}-igw"
  }
}

resource "aws_nat_gateway" "main" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public[0].id

  tags = {
    Name = "\${var.project}-nat"
  }
}

resource "aws_eip" "nat" {
  domain = "vpc"
}`,
    ec2: `resource "aws_instance" "app" {
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = var.instance_type
  key_name               = var.key_pair_name
  vpc_security_group_ids = [aws_security_group.app.id]
  subnet_id              = aws_subnet.private[0].id
  iam_instance_profile   = aws_iam_instance_profile.app.name

  root_block_device {
    volume_type = "gp3"
    volume_size = 30
    encrypted   = true
  }

  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "required"  # IMDSv2
  }

  tags = {
    Name        = "\${var.project}-app"
    Environment = var.environment
  }
}

resource "aws_security_group" "app" {
  name_prefix = "\${var.project}-app-"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`,
    s3: `resource "aws_s3_bucket" "main" {
  bucket = "\${var.project}-\${var.environment}-\${var.bucket_name}"

  tags = {
    Name        = "\${var.project}-\${var.bucket_name}"
    Environment = var.environment
  }
}

resource "aws_s3_bucket_versioning" "main" {
  bucket = aws_s3_bucket.main.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "main" {
  bucket = aws_s3_bucket.main.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.s3.arn
    }
    bucket_key_enabled = true
  }
}

resource "aws_s3_bucket_public_access_block" "main" {
  bucket = aws_s3_bucket.main.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_logging" "main" {
  bucket        = aws_s3_bucket.main.id
  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "s3-access-logs/"
}`,
    rds: `resource "aws_db_instance" "main" {
  identifier     = "\${var.project}-\${var.environment}-db"
  engine         = "postgres"
  engine_version = "15.4"
  instance_class = var.db_instance_class

  allocated_storage     = 100
  max_allocated_storage = 500
  storage_encrypted     = true
  kms_key_id           = aws_kms_key.rds.arn

  db_name  = var.db_name
  username = var.db_username
  password = random_password.db.result

  multi_az               = true
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]

  backup_retention_period = 30
  backup_window          = "03:00-04:00"
  maintenance_window     = "Mon:04:00-Mon:05:00"

  deletion_protection       = true
  skip_final_snapshot       = false
  final_snapshot_identifier = "\${var.project}-final-snapshot"

  performance_insights_enabled = true
  monitoring_interval         = 60
  monitoring_role_arn         = aws_iam_role.rds_monitoring.arn

  tags = {
    Name        = "\${var.project}-database"
    Environment = var.environment
  }
}

resource "aws_db_subnet_group" "main" {
  name       = "\${var.project}-db-subnet"
  subnet_ids = aws_subnet.private[*].id
}

resource "random_password" "db" {
  length  = 32
  special = false
}`,
    eks: `module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name    = "\${var.project}-\${var.environment}"
  cluster_version = "1.28"

  vpc_id     = aws_vpc.main.id
  subnet_ids = aws_subnet.private[*].id

  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = true

  cluster_addons = {
    coredns = {
      most_recent = true
    }
    kube-proxy = {
      most_recent = true
    }
    vpc-cni = {
      most_recent = true
    }
    aws-ebs-csi-driver = {
      most_recent = true
    }
  }

  eks_managed_node_groups = {
    general = {
      desired_size = 2
      min_size     = 1
      max_size     = 5

      instance_types = ["m5.xlarge"]
      capacity_type  = "ON_DEMAND"

      labels = {
        workload = "general"
      }
    }

    spot = {
      desired_size = 2
      min_size     = 0
      max_size     = 10

      instance_types = ["m5.xlarge", "m5a.xlarge", "m5d.xlarge"]
      capacity_type  = "SPOT"

      labels = {
        workload = "batch"
      }

      taints = [{
        key    = "spot"
        value  = "true"
        effect = "NO_SCHEDULE"
      }]
    }
  }

  tags = {
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}`,
  },
  cloudformation: {
    vpc: `AWSTemplateFormatVersion: '2010-09-09'
Description: VPC with public and private subnets

Parameters:
  ProjectName:
    Type: String
    Default: myproject
  Environment:
    Type: String
    AllowedValues: [dev, staging, prod]
  VpcCIDR:
    Type: String
    Default: 10.0.0.0/16

Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: !Ref VpcCIDR
      EnableDnsHostnames: true
      EnableDnsSupport: true
      Tags:
        - Key: Name
          Value: !Sub '\${ProjectName}-vpc'

  PublicSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.1.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: !Sub '\${ProjectName}-public-1'

  PublicSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.2.0/24
      AvailabilityZone: !Select [1, !GetAZs '']
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: !Sub '\${ProjectName}-public-2'

  PrivateSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.10.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
      Tags:
        - Key: Name
          Value: !Sub '\${ProjectName}-private-1'

  PrivateSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.11.0/24
      AvailabilityZone: !Select [1, !GetAZs '']
      Tags:
        - Key: Name
          Value: !Sub '\${ProjectName}-private-2'

  InternetGateway:
    Type: AWS::EC2::InternetGateway
    Properties:
      Tags:
        - Key: Name
          Value: !Sub '\${ProjectName}-igw'

  IGWAttachment:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      VpcId: !Ref VPC
      InternetGatewayId: !Ref InternetGateway

  NATGateway:
    Type: AWS::EC2::NatGateway
    Properties:
      AllocationId: !GetAtt NATGatewayEIP.AllocationId
      SubnetId: !Ref PublicSubnet1
      Tags:
        - Key: Name
          Value: !Sub '\${ProjectName}-nat'

  NATGatewayEIP:
    Type: AWS::EC2::EIP
    Properties:
      Domain: vpc

Outputs:
  VpcId:
    Value: !Ref VPC
    Export:
      Name: !Sub '\${ProjectName}-VpcId'
  PublicSubnets:
    Value: !Join [',', [!Ref PublicSubnet1, !Ref PublicSubnet2]]
  PrivateSubnets:
    Value: !Join [',', [!Ref PrivateSubnet1, !Ref PrivateSubnet2]]`,
    s3: `AWSTemplateFormatVersion: '2010-09-09'
Description: Secure S3 Bucket with encryption and logging

Parameters:
  BucketName:
    Type: String
  Environment:
    Type: String

Resources:
  S3Bucket:
    Type: AWS::S3::Bucket
    DeletionPolicy: Retain
    Properties:
      BucketName: !Ref BucketName
      VersioningConfiguration:
        Status: Enabled
      BucketEncryption:
        ServerSideEncryptionConfiguration:
          - ServerSideEncryptionByDefault:
              SSEAlgorithm: aws:kms
            BucketKeyEnabled: true
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
      LoggingConfiguration:
        DestinationBucketName: !Ref LogBucket
        LogFilePrefix: s3-access-logs/
      LifecycleConfiguration:
        Rules:
          - Id: TransitionToIA
            Status: Enabled
            Transitions:
              - StorageClass: STANDARD_IA
                TransitionInDays: 90
          - Id: TransitionToGlacier
            Status: Enabled
            Transitions:
              - StorageClass: GLACIER
                TransitionInDays: 365

  LogBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub '\${BucketName}-logs'
      BucketEncryption:
        ServerSideEncryptionConfiguration:
          - ServerSideEncryptionByDefault:
              SSEAlgorithm: AES256

Outputs:
  BucketArn:
    Value: !GetAtt S3Bucket.Arn`,
  },
  pulumi: {
    vpc: `import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const config = new pulumi.Config();
const projectName = config.require("projectName");
const environment = config.require("environment");

const vpc = new aws.ec2.Vpc("main", {
  cidrBlock: "10.0.0.0/16",
  enableDnsHostnames: true,
  enableDnsSupport: true,
  tags: {
    Name: \`\${projectName}-vpc\`,
    Environment: environment,
  },
});

const azs = aws.getAvailabilityZones({ state: "available" });

const publicSubnets = azs.then(azs =>
  azs.names.slice(0, 2).map((az, i) =>
    new aws.ec2.Subnet(\`public-\${i}\`, {
      vpcId: vpc.id,
      cidrBlock: \`10.0.\${i + 1}.0/24\`,
      availabilityZone: az,
      mapPublicIpOnLaunch: true,
      tags: { Name: \`\${projectName}-public-\${i + 1}\` },
    })
  )
);

const privateSubnets = azs.then(azs =>
  azs.names.slice(0, 2).map((az, i) =>
    new aws.ec2.Subnet(\`private-\${i}\`, {
      vpcId: vpc.id,
      cidrBlock: \`10.0.\${i + 10}.0/24\`,
      availabilityZone: az,
      tags: { Name: \`\${projectName}-private-\${i + 1}\` },
    })
  )
);

const igw = new aws.ec2.InternetGateway("igw", {
  vpcId: vpc.id,
  tags: { Name: \`\${projectName}-igw\` },
});

const eip = new aws.ec2.Eip("nat-eip", { domain: "vpc" });

const natGateway = new aws.ec2.NatGateway("nat", {
  allocationId: eip.id,
  subnetId: publicSubnets.then(s => s[0].id),
  tags: { Name: \`\${projectName}-nat\` },
});

export const vpcId = vpc.id;
export const publicSubnetIds = publicSubnets.then(s => s.map(sub => sub.id));
export const privateSubnetIds = privateSubnets.then(s => s.map(sub => sub.id));`,
    s3: `import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const config = new pulumi.Config();
const bucketName = config.require("bucketName");

const bucket = new aws.s3.Bucket("main", {
  bucket: bucketName,
  tags: {
    ManagedBy: "pulumi",
  },
});

new aws.s3.BucketVersioningV2("versioning", {
  bucket: bucket.id,
  versioningConfiguration: { status: "Enabled" },
});

new aws.s3.BucketServerSideEncryptionConfigurationV2("encryption", {
  bucket: bucket.id,
  rules: [{
    applyServerSideEncryptionByDefault: {
      sseAlgorithm: "aws:kms",
    },
    bucketKeyEnabled: true,
  }],
});

new aws.s3.BucketPublicAccessBlock("publicAccess", {
  bucket: bucket.id,
  blockPublicAcls: true,
  blockPublicPolicy: true,
  ignorePublicAcls: true,
  restrictPublicBuckets: true,
});

export const bucketArn = bucket.arn;
export const bucketDomainName = bucket.bucketDomainName;`,
  },
};

export const cliCommands: Record<string, Array<{ command: string; description: string; examples: string[] }>> = {
  aws: [
    {
      command: "aws ec2 describe-instances",
      description: "List EC2 instances with details",
      examples: [
        "aws ec2 describe-instances --filters 'Name=instance-state-name,Values=running'",
        "aws ec2 describe-instances --instance-ids i-1234567890abcdef0",
        "aws ec2 describe-instances --query 'Reservations[].Instances[].{ID:InstanceId,Type:InstanceType,State:State.Name}'",
      ],
    },
    {
      command: "aws s3 ls",
      description: "List S3 buckets or objects",
      examples: [
        "aws s3 ls",
        "aws s3 ls s3://my-bucket/ --recursive --human-readable",
        "aws s3 ls s3://my-bucket/prefix/ --summarize",
      ],
    },
    {
      command: "aws sts get-caller-identity",
      description: "Get current IAM identity information",
      examples: ["aws sts get-caller-identity"],
    },
    {
      command: "aws logs tail",
      description: "Tail CloudWatch log groups",
      examples: [
        "aws logs tail /aws/lambda/my-function --follow",
        "aws logs tail /aws/ecs/my-service --since 1h --format short",
      ],
    },
    {
      command: "aws eks update-kubeconfig",
      description: "Configure kubectl for EKS cluster",
      examples: [
        "aws eks update-kubeconfig --name my-cluster --region us-east-1",
        "aws eks update-kubeconfig --name my-cluster --role-arn arn:aws:iam::123456789012:role/EksAdmin",
      ],
    },
  ],
  gcp: [
    {
      command: "gcloud compute instances list",
      description: "List Compute Engine instances",
      examples: [
        "gcloud compute instances list",
        "gcloud compute instances list --filter='status=RUNNING'",
        "gcloud compute instances list --format='table(name,zone,machineType,status)'",
      ],
    },
    {
      command: "gcloud container clusters get-credentials",
      description: "Configure kubectl for GKE cluster",
      examples: [
        "gcloud container clusters get-credentials my-cluster --zone us-central1-a",
        "gcloud container clusters get-credentials my-cluster --region us-central1",
      ],
    },
    {
      command: "gcloud logging read",
      description: "Read Cloud Logging entries",
      examples: [
        "gcloud logging read 'severity>=ERROR' --limit=50",
        "gcloud logging read 'resource.type=cloud_function' --freshness=1h",
      ],
    },
    {
      command: "gcloud auth",
      description: "Authenticate with Google Cloud",
      examples: [
        "gcloud auth login",
        "gcloud auth application-default login",
        "gcloud auth configure-docker",
      ],
    },
  ],
  azure: [
    {
      command: "az vm list",
      description: "List virtual machines",
      examples: [
        "az vm list -o table",
        "az vm list --resource-group myRG -o table",
        "az vm list --query \"[?powerState=='VM running']\"",
      ],
    },
    {
      command: "az aks get-credentials",
      description: "Configure kubectl for AKS cluster",
      examples: [
        "az aks get-credentials --resource-group myRG --name myCluster",
        "az aks get-credentials --resource-group myRG --name myCluster --admin",
      ],
    },
    {
      command: "az monitor activity-log list",
      description: "List activity log events",
      examples: [
        "az monitor activity-log list --start-time 2024-01-01 --offset 7d",
        "az monitor activity-log list --resource-group myRG --status Failed",
      ],
    },
    {
      command: "az login",
      description: "Authenticate with Azure",
      examples: [
        "az login",
        "az login --service-principal -u <app-id> -p <password> --tenant <tenant>",
        "az login --use-device-code",
      ],
    },
  ],
};

export const incidentPlaybooks = [
  {
    title: "High CPU Utilization",
    severity: "P2" as const,
    symptoms: [
      "Application response times increasing",
      "CPU utilization above 90% for 15+ minutes",
      "Auto-scaling events triggered",
    ],
    diagnosis: [
      "Check CloudWatch/Monitoring for CPU metrics trend",
      "Identify the process consuming most CPU (top/htop)",
      "Review recent deployments or config changes",
      "Check for runaway processes or infinite loops",
      "Analyze application logs for errors",
    ],
    resolution: [
      "If caused by traffic spike: verify auto-scaling is working, manually scale if needed",
      "If caused by code issue: identify and fix the problematic code, rollback if necessary",
      "If caused by external dependency: implement circuit breaker, add caching",
      "Scale up instance type if consistently under-provisioned",
    ],
    prevention: [
      "Set up CPU utilization alarms at 70% and 90%",
      "Implement proper auto-scaling policies",
      "Regular load testing to understand capacity limits",
      "Code review for performance-sensitive paths",
    ],
  },
  {
    title: "Database Connection Exhaustion",
    severity: "P1" as const,
    symptoms: [
      "Application errors: 'too many connections'",
      "Increasing response latency",
      "Connection timeout errors in logs",
    ],
    diagnosis: [
      "Check current connection count vs max_connections",
      "Identify which application instances hold the most connections",
      "Check for connection leaks (connections not being returned to pool)",
      "Review connection pool settings",
      "Check if a long-running query is blocking connections",
    ],
    resolution: [
      "Kill idle/long-running connections: SELECT pg_terminate_backend(pid)",
      "Increase max_connections if safe (check memory impact)",
      "Restart application instances with connection leaks",
      "Implement connection pooling (PgBouncer/ProxySQL)",
      "Scale database instance if consistently at capacity",
    ],
    prevention: [
      "Use connection pooling (PgBouncer, RDS Proxy)",
      "Set appropriate pool sizes (connections = (cores * 2) + disk_spindles)",
      "Monitor connection count with alerts at 80% capacity",
      "Implement connection timeout and idle connection cleanup",
    ],
  },
  {
    title: "Disk Space Full",
    severity: "P1" as const,
    symptoms: [
      "Application write failures",
      "Database errors: 'no space left on device'",
      "Log writing failures",
    ],
    diagnosis: [
      "Check disk usage: df -h",
      "Find large files: du -sh /* | sort -rh | head -20",
      "Check for log files consuming space",
      "Verify if temp files are being cleaned up",
      "Check for core dumps or crash dumps",
    ],
    resolution: [
      "Clear old log files: find /var/log -name '*.gz' -mtime +7 -delete",
      "Remove temp files: find /tmp -mtime +1 -delete",
      "Compress large log files",
      "Expand volume if on cloud (EBS/Persistent Disk resize)",
      "Move data to object storage (S3/GCS)",
    ],
    prevention: [
      "Set up disk usage monitoring with alerts at 70% and 85%",
      "Implement log rotation with size limits",
      "Use auto-expanding storage where available",
      "Regular cleanup cron jobs for temp files",
    ],
  },
  {
    title: "SSL/TLS Certificate Expiry",
    severity: "P1" as const,
    symptoms: [
      "Browser showing certificate warnings",
      "API clients receiving TLS handshake failures",
      "Health check failures on HTTPS endpoints",
    ],
    diagnosis: [
      "Check certificate expiry: openssl x509 -enddate -noout -in cert.pem",
      "Check remote certificate: openssl s_client -connect host:443",
      "Verify certificate chain completeness",
      "Check if auto-renewal is configured (Let's Encrypt/ACM)",
    ],
    resolution: [
      "If using ACM/managed certificates: trigger manual renewal",
      "If using Let's Encrypt: run certbot renew",
      "If manual certificate: install the renewed certificate",
      "Verify the new certificate is correctly installed",
      "Restart web servers/load balancers to pick up new cert",
    ],
    prevention: [
      "Use managed certificates (ACM, Cloud-managed SSL)",
      "Set up certificate expiry monitoring (30/14/7 day alerts)",
      "Automate certificate renewal with certbot or similar",
      "Maintain a certificate inventory with expiry dates",
    ],
  },
];
