export type Cluster = 'FMEA'|'Control-Plan'|'Fertigungsprüfung'|'Reklamationsmanagement'|'Maßnahmenmanagement'

export type Module = {
    id: number
    name: string
    cluster: Cluster
    description: string
}
