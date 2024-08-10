import React from 'react';

const DataTable = ({ tables, onSelectTable }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Tabla</th>
        </tr>
      </thead>
      <tbody>
        {tables.map((table) => (
          <tr key={table.name}>
            <td>
              <a href="#" onClick={() => onSelectTable(table)}>
                {table.name}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;