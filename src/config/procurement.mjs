export const procurement = {
  publicFacts: [
    ['Legal name', 'Innovizion Inc.'],
    ['Headquarters', 'Kingston, Ontario, Canada'],
    ['Ownership', 'Canadian-owned corporation'],
    ['Coverage', 'Remote delivery across Canada'],
    ['Engagements', 'Projects, advisory and embedded senior specialists'],
    ['Contracting', 'Direct engagements and subcontracting with prime contractors']
  ],
  // This is a public repository: never store supplier account IDs, tax identifiers,
  // clearance identifiers, private evidence or internal application details here.
  // Add only approved public statuses. Each entry must have:
  // {label, value, verified: true, publish: true, verifiedOn: 'YYYY-MM-DD'}.
  // Public awarded vehicle numbers/categories may be added only with owner approval.
  statuses: []
};
export const publicStatuses = () => procurement.statuses.filter(s => s.verified === true && s.publish === true);
