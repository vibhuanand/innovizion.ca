export const services = [
  {
    slug: 'cloud-platform', number: '01', icon: 'layers', name: 'Cloud & Platform Engineering', short: 'Cloud & platform',
    summary: 'Cloud foundations that connect architecture, governance and the realities of production.',
    headline: 'A stronger foundation for everything you run.',
    intro: 'Design and modernize Azure, AWS, GCP and hybrid platforms with clear boundaries, repeatable deployment and a practical operating model.',
    meta: 'Azure cloud consulting in Canada: landing zones, private networking, governance, hybrid architecture and production platform engineering.',
    fit: 'For teams building a landing zone, untangling an inherited environment or preparing a platform for production.',
    scope: [
      ['Enterprise cloud foundations', 'Subscription and environment structure, landing zones, resource organization, policy and operational ownership.'],
      ['Private connectivity & networking', 'Hub-and-spoke networks, routing, DNS, private endpoints, ingress and egress controls, and hybrid connectivity.'],
      ['Platform modernization', 'Assess existing constraints, sequence changes and migrate infrastructure without losing sight of day-to-day operations.'],
      ['AI platform foundations', 'Secure infrastructure for Azure AI / Microsoft Foundry, Azure OpenAI, model serving and RAG workloads, including identity, isolated deployment patterns, CI/CD, governance and observability.']
    ],
    deliverables: ['Current-state assessment and prioritized decisions', 'Target architecture and deployment standards', 'Infrastructure-as-code modules and environment configuration', 'Operational handover and production-readiness review'],
    technologies: ['Microsoft Azure', 'AWS', 'GCP', 'Terraform', 'Bicep', 'Ansible', 'Microsoft Foundry'],
    assessment: 'Azure Platform Assessment', case: 'digital-identity'
  },
  {
    slug: 'kubernetes', number: '02', icon: 'cluster', name: 'Kubernetes & Container Platforms', short: 'Kubernetes',
    summary: 'Production platforms with deliberate networking, workload isolation and lifecycle management.',
    headline: 'Kubernetes, built for the team that operates it.',
    intro: 'Build and improve AKS, GKE and Kubernetes foundations that make workloads deployable, supportable and recoverable.',
    meta: 'Kubernetes and AKS consulting across Canada. Cluster architecture, GitOps, workload isolation, upgrades and production-readiness reviews.',
    fit: 'For teams moving into production, standardizing clusters or addressing reliability and security gaps in a container platform.',
    scope: [
      ['Cluster architecture', 'Node pools, network topology, ingress, capacity, availability and environment separation.'],
      ['Workload security', 'Namespace boundaries, workload identity, RBAC, secrets, network policies and secure deployment patterns.'],
      ['Platform delivery', 'Helm, container workflows, FluxCD / ArgoCD GitOps, platform services and controlled environment promotion.'],
      ['Lifecycle & recovery', 'Version and upgrade planning, validation gates, workload disruption management and recovery procedures.']
    ],
    deliverables: ['Cluster architecture and production-readiness findings', 'Repeatable cluster and platform configuration', 'GitOps and workload onboarding patterns', 'Upgrade, monitoring and recovery runbooks'],
    technologies: ['Kubernetes', 'AKS', 'GKE', 'Docker', 'Helm', 'FluxCD', 'ArgoCD'],
    assessment: 'AKS Production Readiness Review', case: 'retail-fulfilment'
  },
  {
    slug: 'devops', number: '03', icon: 'flow', name: 'DevOps, DevSecOps & IaC', short: 'DevOps & automation',
    summary: 'Reviewable infrastructure and delivery pipelines that make change easier to trust.',
    headline: 'Make production changes repeatable.',
    intro: 'Connect Terraform, GitOps and CI/CD with clear release governance, security checks and an infrastructure model your team can maintain.',
    meta: 'Terraform, DevOps and DevSecOps consulting in Canada. Reusable IaC, GitHub Actions, Azure DevOps, GitOps and release governance.',
    fit: 'For teams dealing with infrastructure drift, fragile pipelines, duplicated modules or unclear release controls.',
    scope: [
      ['Infrastructure as code', 'Terraform, Terraform Enterprise, Terragrunt, Bicep and Ansible patterns; module design, state modernization and drift remediation.'],
      ['Delivery pipelines', 'GitHub Actions and Azure DevOps workflows with validation, traceability, controlled promotion and rollback planning.'],
      ['DevSecOps controls', 'Integrate secret, dependency and code scanning with practical security gates and remediation ownership.'],
      ['Release governance', 'Immutable release references, plan/apply separation, approvals, environment boundaries and policy-driven deployment.']
    ],
    deliverables: ['Pipeline and IaC assessment with a modernization plan', 'Reusable modules and documented state transitions', 'CI/CD workflows and security validation gates', 'Release, rollback and maintenance guidance'],
    technologies: ['Terraform', 'Terraform Enterprise', 'Terragrunt', 'Bicep', 'Ansible', 'GitHub Actions', 'Azure DevOps', 'GitOps'],
    assessment: 'Terraform / IaC Modernization Assessment', case: 'digital-identity'
  },
  {
    slug: 'cloud-security', number: '04', icon: 'boundary', name: 'Cloud Security & Identity', short: 'Security & identity',
    summary: 'Identity, network controls and security evidence integrated into engineering delivery.',
    headline: 'Security that carries through to implementation.',
    intro: 'Translate security requirements into cloud architecture, access controls, secure configuration and evidence that engineering and assurance teams can use.',
    meta: 'Cloud security and Entra ID consulting in Canada. IAM, secure networking, ITSG-33 control implementation and Protected B readiness support.',
    fit: 'For teams closing assessment findings, strengthening access governance or preparing a regulated cloud platform for authorization.',
    scope: [
      ['Identity & secure access', 'Entra ID, IAM, RBAC, PIM, managed identities, service principals and least privilege. SSO and federation using OAuth 2.0, OIDC and SAML.'],
      ['Platform protection', 'Key Vault, secrets, certificates, TLS, private endpoints, network segmentation, WAF and Microsoft Defender for Cloud remediation.'],
      ['Security architecture', 'Architecture reviews, threat modelling, vulnerability assessment, Zero Trust principles and secure configuration baselines.'],
      ['Assurance & readiness', 'Experience supporting ITSG-33 / NIST SP 800-53-aligned controls, Protected B readiness, SA&A, ISO 27001 / ISMS and SOC 2 readiness, remediation evidence and audit support.']
    ],
    deliverables: ['Security architecture findings and a remediation backlog', 'Identity and privileged-access design', 'Implemented controls and configuration evidence', 'Traceable documentation to support assurance reviews'],
    technologies: ['Microsoft Entra ID', 'Key Vault', 'Defender for Cloud', 'Azure Policy', 'OAuth 2.0', 'OIDC', 'SAML'],
    assessment: 'Cloud Security & Identity Assessment', case: 'federal-aviation'
  },
  {
    slug: 'disaster-recovery', number: '05', icon: 'recovery', name: 'Disaster Recovery & Resilience', short: 'Disaster recovery',
    summary: 'Recovery architecture, dependencies and runbooks designed to be exercised.',
    headline: 'Design for the day your primary region is unavailable.',
    intro: 'Connect business recovery objectives to multi-region architecture, backups, platform dependencies and a credible failover process.',
    meta: 'Azure disaster recovery consulting in Canada. Multi-region architecture, recovery runbooks, backup validation and resilience assessments.',
    fit: 'For teams that need to establish recovery readiness, validate an existing design or resolve gaps between a runbook and the platform.',
    scope: [
      ['Recovery architecture', 'HA / DR patterns, Azure multi-region design, recovery objectives, dependency mapping and service availability trade-offs.'],
      ['Recoverable platforms', 'Kubernetes and database recovery, image availability, identity, DNS, networking and infrastructure-as-code reconstruction.'],
      ['Backup & validation', 'Backup coverage and policy review, restore testing, access requirements and evidence of recovery steps.'],
      ['Failover & failback', 'Decision points, traffic changes, recovery sequencing, operational roles and safe return to normal service.']
    ],
    deliverables: ['Recovery dependency map and gap assessment', 'Target recovery architecture and implementation plan', 'Failover, restore and failback runbooks', 'Exercise plan with recorded results and follow-up actions'],
    technologies: ['Azure', 'Terraform', 'Kubernetes', 'Azure Backup', 'Private DNS', 'Database recovery'],
    assessment: 'Disaster Recovery Readiness Assessment', case: 'digital-identity'
  },
  {
    slug: 'sre-observability', number: '06', icon: 'signal', name: 'SRE & Observability', short: 'SRE & observability',
    summary: 'Useful signals, actionable alerts and operating practices for dependable services.',
    headline: 'Understand the service. Improve its reliability.',
    intro: 'Bring application and platform signals together so teams can investigate incidents, understand capacity and make informed reliability decisions.',
    meta: 'SRE and Dynatrace consulting in Canada. Azure Monitor, KQL, observability as code, service objectives and incident investigation.',
    fit: 'For teams with noisy alerts, incomplete telemetry, recurring incidents or limited visibility across cloud and Kubernetes environments.',
    scope: [
      ['Observability architecture', 'Metrics, logs and traces; platform and workload coverage; retention, access and diagnostic routing.'],
      ['Service reliability', 'SLO / SLA alignment, useful indicators, alert ownership, error-budget discussions and reliability priorities.'],
      ['Incident investigation', 'KQL analysis, root cause investigation, operational runbooks and follow-through on recurring issues.'],
      ['Capacity & automation', 'Performance and capacity review, observability-as-code, dashboards tied to operational questions and repeatable configuration.']
    ],
    deliverables: ['Telemetry and alerting gap assessment', 'Monitoring, diagnostic and dashboard configuration', 'Service indicators and actionable alert guidance', 'Incident and operational improvement backlog'],
    technologies: ['Dynatrace', 'Azure Monitor', 'Log Analytics', 'KQL', 'Prometheus', 'Grafana', 'Datadog'],
    assessment: 'Observability & SRE Assessment', case: 'retail-fulfilment'
  }
];
export const deliveryModels = [
  ['Architecture & Advisory', 'Make architecture decisions with an engineer who understands implementation and operations.'],
  ['Hands-On Engineering', 'Deliver infrastructure, platform configuration, automation and operational documentation.'],
  ['Assessment & Remediation', 'Turn current-state findings into a prioritized backlog and implement the fixes.'],
  ['Platform Modernization', 'Improve existing platforms through sequenced, reviewable changes.'],
  ['Project-Based Delivery', 'Define a bounded scope, tangible deliverables and clear acceptance criteria.'],
  ['Embedded Senior Specialist', 'Add senior engineering capacity within your existing team and delivery practices.'],
  ['Cloud Security Review', 'Review architecture, identity, networking and configuration against your requirements.'],
  ['DR / Resilience Assessment', 'Examine recovery dependencies, runbooks, backups and readiness to exercise failover.']
];
