import { ResultsUser } from '@start-bootstrap/sb-clean-blog-shared-types';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Index({ unique: true })
    @Column()
    email!: string;

    @Column({ nullable: true })
    passwordHash!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @VersionColumn()
    version!: number;

    toResultsUser(): ResultsUser {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
        };
    }
}
