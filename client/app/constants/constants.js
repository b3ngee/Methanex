// API endpoints
export const prodAPIEndpoint = 'https://methanex-approvals.herokuapp.com';
// export const prodAPIEndpoint = 'http://localhost:8080';
export const apiaryAPIEndpoint = 'https://private-2a709-methanex.apiary-mock.com';

// User roles
export const RESOURCE_MANAGER = 'RESOURCE_MANAGER';
export const SUPER_ADMIN = 'SUPER_ADMIN';
export const PORTFOLIO_MANAGER = 'PORTFOLIO_MANAGER';
export const RESOURCE = 'RESOURCE';
export const PROJECT_MANAGER = 'PROJECT_MANAGER';

// Statuses for Projects
export const STATUS = [
    {id: 'PIPELINE', name: 'Pipeline'},
    {id: 'PRE_APPROVAL', name: 'Pre-Approval'},
    {id: 'SEEKING_FUNDING', name: 'Seeking Funding'},
    {id: 'ON_HOLD', name: 'On Hold'},
    {id: 'UNDERWAY', name: 'Underway'},
    {id: 'STOPPED', name: 'Stopped'}
];
export const RAG_STATUS = [
    {id: 'RED', name: 'Red'},
    {id: 'AMBER', name: 'Amber'},
    {id: 'GREEN', name: 'Green'}
];
export const COMPLETE = [
    {id: 'true', name: 'True'},
    {id: 'false', name: 'False'}
];

// Skill competency
export const COMPETENCY = [
    {id: 1, name: '1'},
    {id: 2, name: '2'},
    {id: 3, name: '3'},
    {id: 4, name: '4'},
    {id: 5, name: '5'}
];

// Statuses for Resources
export const RESOURCE_STATUS = [
    {id: 'Available', name: 'Available'},
    {id: 'Unavailable', name: 'Unavailable'}
];

// User status
export const USER_STATUS = [
    {id: 'true', name: 'Enabled'},
    {id: 'false', name: 'Disabled'}
];
