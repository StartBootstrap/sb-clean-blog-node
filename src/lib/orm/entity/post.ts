import { ResultsPost } from '@start-bootstrap/sb-clean-blog-shared-types';
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
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Index({ unique: true })
    @Column()
    slug!: string;

    @Column()
    backgroundImage!: string;

    @Column()
    heading!: string;

    @Column()
    subHeading!: string;

    @Column()
    meta!: string;

    @Column('text')
    body!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @VersionColumn()
    version!: number;

    toResultsPost(): ResultsPost {
        return {
            id: this.id,
            slug: this.slug,
            backgroundImage: this.backgroundImage,
            heading: this.heading,
            subHeading: this.subHeading,
            meta: this.meta,
            body: this.body,
        };
    }
}
