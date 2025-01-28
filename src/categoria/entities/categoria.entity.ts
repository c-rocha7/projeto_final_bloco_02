import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';

@Entity({ name: 'tb_categoria' })
export class Categoria {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Transform(({ value }: TransformFnParams) => {
    if (typeof value === 'string') {
      return value.trim();
    }
    return '';
  })
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  nome: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produto: Produto;
}
