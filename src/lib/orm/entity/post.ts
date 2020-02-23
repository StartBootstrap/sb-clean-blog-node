import { ResultsPost } from '@start-bootstrap/sb-clean-blog-shared-types';
import moment from 'moment';
import { Column, Entity, Index, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

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

    @Column({ nullable: true })
    meta!: string;

    @Column('text')
    body!: string;

    @Column({
        default: () => 'NOW()',
    })
    createdAt!: Date;

    @Column({
        default: () => 'NOW()',
    })
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
            meta: this.meta ? this.meta : moment(this.createdAt).format('MMMM D, YYYY'),
            body: this.body,
        };
    }
}
