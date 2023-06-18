/* eslint-disable import/extensions */
/* eslint-disable comma-dangle */
import ExpressError from '../expressError.js';

export default function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new ExpressError('No data', 400);

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(', '),
    values: Object.values(dataToUpdate),
  };
}
