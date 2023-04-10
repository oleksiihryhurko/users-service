import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import { Role } from "../common/enum/role.enum";
import { encryptPassword } from "../utils/password";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({
        type: 'enum',
        enum: Role
    })
    role: Role

    @BeforeInsert()
    async beforeInsert() {
        this.password = await encryptPassword(this.password);
    }
}