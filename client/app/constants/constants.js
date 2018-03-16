// API endpoints
export const prodAPIEndpoint = 'https://methanex-portfolio-management.herokuapp.com';
export const apiaryAPIEndpoint = 'https://private-2a709-methanex.apiary-mock.com';

// User roles
export const RESOURCE_MANAGER = 'RESOURCE_MANAGER';
export const SUPER_ADMIN = 'SUPER_ADMIN';
export const PORTFOLIO_MANAGER = 'PORTFOLIO_MANAGER';
export const RESOURCE = 'RESOURCE';
export const PROJECT_MANAGER = 'PROJECT_MANAGER';

// Statuses for Projects
export const STATUS = [
    {id: 'Pipeline', name: 'Pipeline'},
    {id: 'Pre-Approval', name: 'Pre-Approval'},
    {id: 'Seeking Funding', name: 'Seeking Funding'},
    {id: 'On Hold', name: 'On Hold'},
    {id: 'Underway', name: 'Underway'},
    {id: 'Stopped', name: 'Stopped'}
];
export const RAG_STATUS = [
    {id: 'Red', name: 'Red'},
    {id: 'Amber', name: 'Amber'},
    {id: 'Green', name: 'Green'}
];
export const COMPLETE = [
    {id: 1, name: 'True'},
    {id: 0, name: 'False'}
];
