import * as grpc from '@grpc/grpc-js';
import { Tag, TagsServiceServer, TagsServiceService } from '@home/proto/tags';
import {
  Sequelize,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Op,
} from 'sequelize';

const PORT = 50052;

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  database: 'postgres',
  password: 'secret',
});

class TagDb
  extends Model<InferAttributes<TagDb>, InferCreationAttributes<TagDb>>
  implements Tag
{
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
}

TagDb.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tag_ts',
  }
);

const handlers: TagsServiceServer = {
  getTags(call, cb) {
    TagDb.findAll({
      where: {
        id: {
          [Op.in]: call.request.tagIds,
        },
      },
    }).then((tags) => {
      if (tags.length === 0) {
        cb({ code: grpc.status.NOT_FOUND, message: 'tags not found' }, null);
        return;
      }
      cb(null, { tags });
    });
  },
};

const main = async () => {
  await sequelize.sync({ force: true });

  await TagDb.bulkCreate([
    { name: 'funny', description: 'funny stuf' },
    { name: 'sad', description: 'sad face' },
    { name: 'xxx', description: 'shhh...' },
  ]);

  const server = new grpc.Server();
  server.addService(TagsServiceService, handlers);

  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log(`server listening on port ${PORT}`);
    }
  );
};

main();
