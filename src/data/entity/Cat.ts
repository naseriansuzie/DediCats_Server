/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import {
    Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany,
} from "typeorm";
import Tag from "./Tag";
import Photo from "./Photo";
// const cutDefault:string = "{ Y :  0, N : 0, unknown : 0}";
// const rainbowDefault:string = "{ Y :  0, Y_date : 2020-01-31 , N : 0, N_date : 2020-01-31  }";

@Entity({ name: "cat" })
export default class Cat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id! :number;

    @Column({ type: "nvarchar", nullable: true })
    description! :string;

    @Column({ type: "point", nullable: true })
    location! :string;

    @Column({ type: "varchar", nullable: false })
    nickname! :string;

    @Column({
        type: "varchar", nullable: false, length: 20,
        // default: cutDefault,
    })
    cut! :string;

    @Column({
        type: "varchar", nullable: false, length: 100,
        // default: rainbowDefault,
    })
    rainbow! :string;

    @Column({ type: "varchar", nullable: true })
    species! :string;

    @Column({ type: "varchar", nullable: true })
    today! :string;

    @Column({
        type: "timestamp", name: "today_time", nullable: true,
    })
    todayTime! :Date;

    @CreateDateColumn({ name: "create_at" })
    createAt! : Date;

    @UpdateDateColumn({ name: "update_at" })
    updateAt! : Date;

    @OneToMany((type) => Photo, (photo) => photo.cat_id)
    photo!: Photo[];

    @ManyToMany((type) => Tag, (tag) => tag.id, { cascade: true })
    @JoinTable()
    tags! :Tag[];
}
