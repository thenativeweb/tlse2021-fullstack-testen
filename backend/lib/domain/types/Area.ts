import { JsonSchema } from 'validate-value';

enum Area {
  front = 'front',
  center = 'center',
  back = 'back'
}

const getAreaSchema = function (): JsonSchema {
  return {
    type: 'string',
    enum: Object.values(Area)
  };
};

export {
  Area,
  getAreaSchema
};
