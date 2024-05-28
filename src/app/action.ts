export interface Action {
    name: string;
    icon: string;
    action: (i: any, data?: any, tickets?: any) => void;
    color: string;
    actionStatus: number[];
    usage?: string;
}
