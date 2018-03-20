export function sanitizeBudget(budget) {
    return `\$${budget}.00`;
}

export function sanitizeProjectStatus(status) {
    switch(status) {
        case 'PIPELINE':
            return 'Pipeline';
        case 'PRE_APPROVAL':
            return 'Pre-Approval';
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
        case 'GREEN':
            return 'Green';
        default:
            return status;
    }
}

export function enumifyProjectStatus(status) {
    switch(status) {
        case 'Pipeline':
            return 'PIPELINE';
        case 'Pre-Approval':
            return 'PRE_APPROVAL';
        case 'Seeking Funding':
            return 'SEEKING_FUNDING';
        case 'On Hold':
            return 'ON_HOLD';
        case 'Underway':
            return 'UNDERWAY';
        case 'Stopped':
            return 'STOPPED';
        default:
            return status;
    }
}

export function enumifyRagStatus(status) {
    switch(status) {
        case 'Red':
            return 'RED';
        case 'Amber':
            return 'AMBER';
        case 'Green':
            return 'GREEN';
        default:
            return status;
    }
}
