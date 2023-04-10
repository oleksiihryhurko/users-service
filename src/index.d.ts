import { UserDTO } from "./users/user.dto";

declare global {
    namespace Express {
        interface Request {
            user: UserDTO
        }
    }
}