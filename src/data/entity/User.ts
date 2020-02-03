/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
    Entity, BaseEntity, 
    PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany
} from "typeorm";

import Alert from "./Alert";
import Comment from "./Comment";
import Cat from "./Cat";
import Report from "./Report";
import Post from "./Post";

@Entity({ name: "user" })
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", nullable: false })
    nickname! : string;

    @Column({ type: "varchar", nullable: false })
    password! : string;

    @Column({ type: "varchar", nullable: false })
    email! : string;

    @Column({ type: "varchar", nullable: false, name: "user_status" })
    userStatus! : string;

    @Column({ type: "varchar", nullable: true, name: "user_photo_path" })
    userPhotoPath! : string;

    @CreateDateColumn({ name: "create_at" })
    createAt! : Date;

    @UpdateDateColumn({ name: "update_at" })
    updateAt! : Date;

    @OneToMany((type) => Alert, (alert) => alert.user)
    alerts! : Alert[];

    @OneToMany((type) => Comment, (comment) => comment.user)
    comments! : Comment[];

    @OneToMany((type) => Cat, (cat) => cat.user)
    cats! : Cat[];

    @OneToMany((type) => Report, (report) => report.user)
    reports! : Report[];

    @OneToMany((type) => Post, (post) => post.user)
    posts! : Post[];



}