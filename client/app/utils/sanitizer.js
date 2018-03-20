export function sanitizeProjectStatus(status) {
    switch(status) {
        case 'PIPELINE':
            return 'Pipeline';
        case 'PRE_APPROVAL':
            return 'Pre Approval';
        case 'SEEKING_FUNDING':
            return 'Seeking Funding';
        case 'ON_HOLD':
            return 'On Hold';
        case 'UNDERWAY':
            return 'Underway';
        case 'STOPPED':
            return 'Stopped';
        default:
            return status;
    }
}

export function sanitizeRagStatus(status) {
    switch(status) {
        case 'RED':
            return 'Red';
        case 'AMBER':
            return 'Amber';
        case 'Green':
            return 'Green';
        default:
            return status;
    }
}
