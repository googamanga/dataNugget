# DataNugget

## Excerpt from my Blog at [googamanga.tumblr.com](http://googamanga.tumblr.com)

The aim for this to be a mini, open source [http://www.kaggle.com](http://www.kaggle.com).  A place where people can submit tabular data, pick a column that should be predicted by other columns, run the learning algorithm, and have a simple interface to predict future similar queries.


The page is divided into three main parts.

1. Insertion of CSV Data
     Paste in some CSV data into the textarea field.  The first row must have column names. Some demo data is provided.  The data is from http://www.scientific-consultants.com/nnbd.html.  The data “consists of Black-Sholes option prices for volatility levels running from 20 to 200%, for the time remaining from 5 to 15 days, and for strike price running from 70 to 130$. The stock price was set to 100 dollars and the interest rate to 0 percent when generating the data.

2. Massaging of Data
     A table gets created.  The column names are pulled from CSV data.  The rows are
    Target: click on the column that will be the value you are trying to model.  Other columns automatically become the drivers for that model (unless the columns are skipped)
    Skip: click on the columns you do not want to be included in the model
    Type: click on the type of data the column represents. Right now the app only supports continuous numerical values.  By continuous I mean that the values should be able to be represented by range.  A rating system of 1 to 10 is continuous by a list of zip codes is not.  For example there is no such thing as a value between zip codes.

3. Training and Output: After the training of the neural network is complete, the app runs a sample on 10% of the total data and compares error rates of the outputs. The text area contains average errors of normalized and non-normalized output values. The error rates on the demo data should be anywhere from 5% to 1.5% for the normalized data. After normalization, the better runs get me to about $0.50 accuracy.

When the neural network is trained you are able to enter values into the text boxes.  Hit enter to trigger the evaluation of the inputs.  the target field should update right away.