import { IMessage } from "./Actor";

export class ActorSystemProcess {
    constructor(private readonly worker: Worker) {
    }

    send(message: IMessage): void {
        this.worker.postMessage(message);
    }

    listen(callback: (data: any) => void): void {
        this.worker.addEventListener('message', ({data}) => {
            callback(data);
        });
    }
}