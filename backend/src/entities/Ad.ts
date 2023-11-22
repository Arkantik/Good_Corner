import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Length } from "class-validator";
import Category from "./Category";
import Tag from "./Tag";

@Entity()
export default class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(5, 100, { message: "Title needs between 5 to 100 characters" })
  @Column({ length: 100 })
  title: string;

  @Column({ length: 100 })
  description: string;

  @Column({ length: 100 })
  owner: string;

  @Column({ type: "float" })
  price: number;

  @Column({ length: 255 })
  picture: string;

  @Column({ length: 100 })
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.ads, {
    cascade: true,
    onDelete: "CASCADE",
  })
  category: Category;

  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.ads, {
    cascade: true,
  })
  tags: Tag[];
}
