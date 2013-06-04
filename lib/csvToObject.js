//from:http://www.cparker15.com/code/utilities/csv-to-json/
//6/4/2013
//Christopher Parker
//slightly customized

// <!--
//  * csv-to-json: A utility that converts data format from CSV to JSON.
//  * Copyright (C) 2009-2012 Christopher Parker <http://www.cparker15.com/>
//  * 
//  * csv-to-json is free software: you can redistribute it and/or modify
//  * it under the terms of the GNU Lesser General Public License as published by
//  * the Free Software Foundation, either version 3 of the License, or
//  * (at your option) any later version.
//  * 
//  * csv-to-json is distributed in the hope that it will be useful,
//  * but WITHOUT ANY WARRANTY; without even the implied warranty of
//  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  * GNU Lesser General Public License for more details.
//  * 
//  * You should have received a copy of the GNU Lesser General Public License
//  * along with csv-to-json.  If not, see <http://www.gnu.org/licenses/>.
// -->

function parseCSVLine (line)
{
  var csvRows = [];
  var objArr = [];
  line = line.split(',');
  // check for splits performed inside quoted strings and correct if needed
  for (var i = 0; i < line.length; i++)
  {
    var chunk = line[i].replace(/^[\s]*|[\s]*$/g, "");
    var quote = "";
    if (chunk.charAt(0) == '"' || chunk.charAt(0) == "'") quote = chunk.charAt(0);
    if (quote != "" && chunk.charAt(chunk.length - 1) == quote) quote = "";
    if (quote != "")
    {
      var j = i + 1;
      if (j < line.length) chunk = line[j].replace(/^[\s]*|[\s]*$/g, "");
      while (j < line.length && chunk.charAt(chunk.length - 1) != quote)
      {
        line[i] += ',' + line[j];
        line.splice(j, 1);
        chunk = line[j].replace(/[\s]*$/g, "");
      }
      if (j < line.length)
      {
        line[i] += ',' + line[j];
        line.splice(j, 1);
      }
    }
  }
  for (i = 0; i < line.length; i++)
  {
    // remove leading/trailing whitespace
    line[i] = line[i].replace(/^[\s]*|[\s]*$/g, "");
    // remove leading/trailing quotes
    if (line[i].charAt(0) == '"') line[i] = line[i].replace(/^"|"$/g, "");
    else if (line[i].charAt(0) == "'") line[i] = line[i].replace(/^'|'$/g, "");
  }
  return line;
}

function csvToObject (csvText, outputColumnName, columnNamesToSkip)
{
  var message = "";
  var error = false;
  // var f = document.forms["convertForm"];
  // var csvText = f.elements["csv"].value;
  var jsonText = "";
  var indexOfResultColumn = null;
  var indexesOfColumnToSkip = [];
  var i, j, k = null;

  if (csvText == "") { error = true; message = "empty input"; }

  if (!error)
  {
    csvRows = csvText.split(/[\r\n]/g); // split into rows

    // get rid of empty rows
    for (i = 0; i < csvRows.length; i++)
    {
      if (csvRows[i].replace(/^[\s]*|[\s]*$/g, '') == "")
      {
        csvRows.splice(i, 1);
        i--;
      }
    }

    if (csvRows.length < 2) {console.log('error: The CSV text MUST have a header row!');}
    else
    {
      objArr = [];

      for (i = 0; i < csvRows.length; i++)
      {
        csvRows[i] = parseCSVLine(csvRows[i]);
      }

      //find index of output column
      for(i = 0; i < csvRows[0].length; i++){
        if(csvRows[0][i] === outputColumnName){
          indexOfResultColumn = i;
          break;
        }
        for(j = 0; j < columnNamesToSkip.length; j++){
          if(csvRows[0][i] === columnNamesToSkip[j]){
            indexesOfColumnToSkip.push(i);
            break;
          }
        }
      }

      for (i = 1; i < csvRows.length; i++)
      {
        if (csvRows[i].length > 0) objArr.push({input: {}, output: {}});

        for (j = 0; j < csvRows[i].length; j++)
        {
          var continueFlag = 0;
          for(k = 0; k < indexesOfColumnToSkip.length; k++){
            if(j === indexesOfColumnToSkip[k]){
              continueFlag = 1;
              break;
            }
          }
          if(continueFlag) { continue; }
          if(j !== indexOfResultColumn){
            objArr[i - 1].input[csvRows[0][j]] = csvRows[i][j];
          } else {
            objArr[i - 1].output[csvRows[0][j]] = csvRows[i][j];
          }
        }
      }
      console.log('cvs to JSON complete!');
      // return JSON.stringify(objArr, null, "\t");
      return objArr;
    }
  }
}
















