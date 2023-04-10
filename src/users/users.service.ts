import { UserDTO } from "./user.dto";
import { postgresDataSource } from "../database/postgres";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { BadRequestException } from "../exceptions/bad-request.exceptions";
import { generateAccessToken } from "../utils/jwt";
import { validatePassword } from "../utils/password";
import { createMQProducer, MQProducer } from "../message-broker/mq.manager";
import { Action, Queue } from "../common/enum/queue.enum";
import { MQMessage } from "../common/types/mq-message.type";

export class UsersService {
    private readonly userRepository: Repository<User>;
    private readonly mq: MQProducer;
    constructor() {
        this.userRepository = postgresDataSource.getRepository(User);
        this.mq = createMQProducer(Queue.USERS);
    }

    async signup(userDto: UserDTO): Promise<void> {
        const user = this.userRepository.create(userDto);
        await this.userRepository.save(user)
            .catch(() => {
                throw new BadRequestException(`Email already taken`)
            })
        const message: MQMessage<Omit<UserDTO, 'password'>> = {
            action: Action.USER_REGISTERED,
            data: {
                email: user.email,
                role: user.role
            }
        };
        this.mq.send(message);
    }

    async signin(userDto: UserDTO): Promise<string> {
        const { email, password, role } = userDto;
        const user = await this.userRepository.findOne({ where: { email, role } });
        if (user) {
            const isValidPassword = await validatePassword(password, user.password)
            if (isValidPassword) {
                const token = generateAccessToken(userDto);
                return token;
            }
        }
        throw new BadRequestException('Creadentials are no valid');
    }
}