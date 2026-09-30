export const experienceNotice = 'Selected delivery experience of Innovizion personnel, including work performed through other organizations and subcontracting arrangements. These summaries do not imply direct contracts with Innovizion or client endorsement.';
export const caseStudies = [
  {
    slug: 'digital-identity', sector: 'Digital identity · Financial services', title: 'A regulated identity platform on Azure.',
    summary: 'Infrastructure, security remediation and recovery architecture for a Canadian digital identity environment supporting access to federal online services.',
    challenge: 'Support production delivery in a regulated Azure identity environment where infrastructure changes, security requirements and recovery dependencies need to remain aligned.',
    approach: 'Connect platform engineering with infrastructure-as-code modernization, controlled releases, private networking and security assessment remediation.',
    scope: ['Azure infrastructure and platform engineering', 'Terraform modernization and reusable modules', 'AKS, private networking and GitHub Actions', 'Identity, RBAC and Dynatrace observability', 'DR architecture, production readiness and SA&A remediation', 'ITSG-33 / NIST-aligned control implementation'],
    outcome: 'Delivery contributions included maintainable infrastructure code, platform configuration, security remediation evidence and recovery architecture to support ongoing production-readiness work.',
    technology: ['Azure', 'Terraform', 'AKS', 'GitHub Actions', 'Entra ID', 'Dynatrace']
  },
  {
    slug: 'federal-aviation', sector: 'Federal environment · Aviation', title: 'Cloud engineering for an aviation platform.',
    summary: 'Azure architecture and engineering in a federal aviation environment, with deployment standards and security-readiness support.',
    challenge: 'Develop cloud platform foundations for a federally regulated aviation environment while supporting availability, security and assurance requirements.',
    approach: 'Use Azure architecture and Bicep to connect compute, networking, storage, identity, monitoring and recovery with repeatable deployment standards.',
    scope: ['Azure architecture and Bicep infrastructure as code', 'Compute, networking and storage configuration', 'Monitoring, identity and deployment standards', 'Backup, disaster recovery and high availability', 'Protected B readiness and security support', 'ISO 27001 and SOC 2 readiness activities'],
    outcome: 'Contributions covered repeatable deployment foundations, operational configuration, recovery planning and documentation supporting security and compliance readiness.',
    technology: ['Azure', 'Bicep', 'Entra ID', 'Azure Monitor', 'Azure Backup']
  },
  {
    slug: 'retail-fulfilment', sector: 'Enterprise retail · Fulfilment', title: 'Platform foundations at enterprise scale.',
    summary: 'Azure and GCP Kubernetes platform work supporting high-volume retail and fulfilment services.',
    challenge: 'Support cloud and Kubernetes platforms serving high-volume fulfilment workloads across environments with demanding operational requirements.',
    approach: 'Bring together landing-zone architecture, reusable infrastructure, GitOps and observability with access governance and regional recovery work.',
    scope: ['AKS and GKE platform engineering', 'Enterprise landing zones and scalable cloud foundations', 'Terraform, Terragrunt and GitOps', 'Dynatrace observability and SRE practices', 'IAM, RBAC and platform security', 'Regional recovery planning'],
    outcome: 'Delivery contributions included reusable platform configuration, deployment automation, operational visibility and regional recovery foundations for enterprise services.',
    technology: ['Azure', 'GCP', 'AKS', 'GKE', 'Terraform', 'Terragrunt', 'Dynatrace']
  }
];
