import React from "react";
import { Paper, Typography } from "@material-ui/core";

function Table(props) {
  let data = props.data;
  return (
    <div style={{ width: "100%" }}>
      {data.length > 0 ? (
        <table>
          &nbsp;&nbsp;
          <th style={{ width: "50%" }}>Name</th>
          <th style={{ width: "50%" }}>Rank</th>
          {data.map((data, index) => {
            return (
              <tr>
                &nbsp;&nbsp;
                <td
                  style={{
                    width: "50%",
                    //  border: "2px solid black",
                    textAlign: "center",
                  }}
                >
                  {data.Userid}
                </td>
                <td
                  style={{
                    width: "50%",
                    //border: "2px solid black",
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </td>
              </tr>
            );
          })}
        </table>
      ) : (
        <Typography>No records Found</Typography>
      )}
    </div>
  );
}

export default Table;
