import { getSequelize } from "../database/Connection";

export function Transactional() {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const sequelize = getSequelize();
      const transaction = await sequelize.transaction();

      try {
        const result = await originalMethod.apply(this, [...args, transaction]);
        await transaction.commit();
        return result;
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    };

    return descriptor;
  };
}
