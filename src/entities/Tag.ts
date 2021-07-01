import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity('tags')
export class Tag {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date

  @Expose({ name: "nameCustom" })
  nameCutom(): string {
    return `#${this.name}`
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
