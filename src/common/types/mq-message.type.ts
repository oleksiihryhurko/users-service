import { Action } from "../enum/queue.enum"

export type MQMessage<D = any> = {
    action: Action,
    data: D
}