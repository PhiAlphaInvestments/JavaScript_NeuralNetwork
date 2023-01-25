console.log("inscript")


//inpsired by,
//https://github.com/stephencwelch/Neural-Networks-Demystified

class Row{
    Row =[];
    Row(){};



    Resize(size){

        if(size < 0 ){

            return;

        }
        if( this.Row.length < size){




            let startlen =this.Row.length;
            for (let i = 0; i < size -  startlen ; i++) {
                this.Row.push(0);
            }

        }





        if( this.Row.length > size){




            let startlen =this.Row.length;
            for (let i = 0; i < startlen -size  ; i++) {
                this.Row.pop();
            }

        }

    };


}





class Matrix{

    Col =[];
    m_rows = 0;
    m_cols = 0;


    constructor(rows, cols){

        this.Resize(rows,cols);




    };
    Shape(){

        var h = (this.m_rows, this.m_cols);
        console.log(h);
    }
    Resize(row,col){



        if( this.m_rows < row){




            let startlen =this.m_rows;

            for (let i = 0; i < row -  startlen ; i++) {
                var tempRow = new Row();
                tempRow.Resize(col);
                this.Col.push(tempRow);
            }

        }





        if( this.m_cols > col){




            let startlen =this.m_cols;
            for (let i = 0; i < startlen -col  ; i++) {
                this.Col.pop();
            }

        }




        this.m_rows = row;
        this.m_cols = col;


    };

    Add( Matrix_ ){
        var tempMatrix = new Matrix(this.m_rows,this.m_cols);
        if( Matrix_.m_cols === this.m_cols  && Matrix_.m_rows ===  this.m_rows   ) {

            for (let i = 0; i < this.m_rows; i++) {

                for (let j = 0; j < this.m_cols; j++) {
                    tempMatrix.Col[i].Row[j] = Matrix_.Col[i].Row[j] + this.Col[i].Row[j];
                }
            }
        }
        return tempMatrix;
    };


    Average(){
        var Average =0;


            for (let i = 0; i < this.m_rows; i++) {

                for (let j = 0; j < this.m_cols; j++) {
                    Average += this.Col[i].Row[j];
                }
            }

        return Average/(this.m_rows*this.m_cols);
    };



    Subtract( Matrix_ ){
        var tempMatrix = new Matrix(this.m_rows,this.m_cols);
        if( Matrix_.m_cols === this.m_cols  && Matrix_.m_rows ===  this.m_rows   ) {

            for (let i = 0; i < this.m_rows; i++) {

                for (let j = 0; j < this.m_cols; j++) {
                    tempMatrix.Col[i].Row[j] = this.Col[i].Row[j] -Matrix_.Col[i].Row[j] ;
                }
            }
        }
        return tempMatrix;
    };


    Multiply( Matrix_ ){
        var tempMatrix = new Matrix(this.m_rows,this.m_cols);
        if( Matrix_.m_cols === this.m_cols  && Matrix_.m_rows ===  this.m_rows   ) {

            for (let i = 0; i < this.m_rows; i++) {

                for (let j = 0; j < this.m_cols; j++) {
                    tempMatrix.Col[i].Row[j] = this.Col[i].Row[j] *Matrix_.Col[i].Row[j] ;
                }
            }
        }
        return tempMatrix;
    };



    Fill( Value_ ){


            for (let i = 0; i < this.m_rows; i++) {

                for (let j = 0; j < this.m_cols; j++) {
                    this.Col[i].Row[j] =  Value_;//Matrix_.Col[i].Row[j] + this.Col[i].Row[j];
                }
            }

    };


    Transpose(){

        var tempMatrix = new Matrix(this.m_cols ,this.m_rows);
        if(this.m_rows > 0 || this.m_cols >0) {


            for (let i = 0; i < this.m_rows; i++) {

                for (let j = 0; j < this.m_cols; j++) {
                    tempMatrix.Col[j].Row[i] = this.Col[i].Row[j];//Matrix_.Col[i].Row[j] + this.Col[i].Row[j];
                }
            }


        }else {
            console.log("no transpose preformed")
        }
        return tempMatrix;


    };

    Random(){

        for (let i = 0; i < this.m_rows; i++) {

            for (let j = 0; j < this.m_cols; j++) {
                this.Col[i].Row[j] = this.NormalRandom(0,1) ;
            }
        }

    };

    Sigmoid(){
        var tempMatrix = new Matrix(this.m_rows,this.m_cols);
        for (let i = 0; i < this.m_rows; i++) {

            for (let j = 0; j < this.m_cols; j++) {
                tempMatrix.Col[i].Row[j] = 1/(1+Math.exp(-1*this.Col[i].Row[j])) ;
            }
        }
        return tempMatrix;
    };


    SigmoidPrime(){
        var tempMatrix = new Matrix(this.m_rows,this.m_cols);
        for (let i = 0; i < this.m_rows; i++) {

            for (let j = 0; j < this.m_cols; j++) {
                tempMatrix.Col[i].Row[j] = Math.exp(-1*this.Col[i].Row[j])/(Math.pow(1+Math.exp(-1*this.Col[i].Row[j]),2)) ;
            }
        }
        return tempMatrix;
    };

    Print(){

        for(let i =0; i<this.m_rows;i++){

            console.log(this.Col[i].Row);

        }


    };

    NormalRandom(mu, std) {

        let sample = Math.sqrt(  Math.log( (1 - Math.random()) )*-2) * Math.cos(  6.141592635897932384 * Math.random());

        return  mu+ std*sample  ;
    };


    MatrixMultiplication(Matrix_){


          var  tempMatrix = new Matrix(this.m_rows ,Matrix_.m_cols);

          if( this.m_cols  === Matrix_.m_rows){
              var N = this.m_rows;
              var C = Matrix_.m_cols;
              var B = this.m_cols;
              for( let i = 0 ; i < N ; i++ ){
                  for( let j= 0; j<C;j++){

                      var product =0;

                      for( let k = 0; k<B;k++){

                          product = product + this.Col[i].Row[k]*Matrix_.Col[k].Row[j];

                      }


                      tempMatrix.Col[i].Row[j] = product;


                  }

              }


          }

        return tempMatrix;
    }

}


class NeuralNetwork{



    m_LearningRate;
    m_deep;
    m_depth;
    m_alpha;
    m_outDim;
    W_1;
    W_2;
    m_input;
    m_pred_input;
    m_z_2;
    m_a_2;
    m_z_3;
    m_yHat;
    z_3_prime;
    z_2_prime;
    delta2;
    delta3;
    dJdW1;
    dJdW2;
    y_cor;

    constructor(in_DimensionRow,in_DimensionCol, Number_of_Neurons, out_Dimension, alpha, LearningRate) {

        this.m_depth = in_DimensionCol;
        this.m_deep  = Number_of_Neurons;
        this.m_alpha = alpha;
        this.m_outDim= out_Dimension;
        this.m_LearningRate = LearningRate;

        this.W_1 = new Matrix(this.m_depth,this.m_deep);
        this.W_2 = new Matrix(this.m_deep, this.m_outDim);

        this.W_1.Random();
        this.W_2.Random();
    }


    Forward_Prop(Matrix_Input){

        this.m_input = Matrix_Input;

        this.m_z_2   =  this.m_input.MatrixMultiplication(this.W_1);

        this.m_a_2   = this.m_z_2.Sigmoid();

        this.m_z_3   = this.m_a_2.MatrixMultiplication(this.W_2);

        return  this.m_z_3.Sigmoid();



    }

    Prediction(Matrix_Input){

        this.m_pred_input = Matrix_Input;

        var pred_z_2 = this.m_pred_input.MatrixMultiplication(this.W_1);

        var pred_a_2 = pred_z_2.Sigmoid();

        var pred_z_3 = pred_a_2.MatrixMultiplication(this.W_2);

        return pred_z_3.Sigmoid();
    }


    ComputeDerivatives( Matrix_Input, y_ ){

           var  X = Matrix_Input;
           var  Y = y_;

           this.m_yHat = this.Forward_Prop(X);

           var cost = (this.m_yHat.Subtract(Y));

           this.z_3_prime = this.m_z_3.SigmoidPrime();
           this.delta3 =  this.z_3_prime.Multiply(cost);

           this.dJdW2 = this.m_a_2.Transpose().MatrixMultiplication(this.delta3);


           this.z_2_prime = this.m_z_2.SigmoidPrime();
           this.delta2 = this.delta3.MatrixMultiplication(this.W_2.Transpose()).Multiply(this.z_2_prime);

           this.dJdW1 = X.Transpose().MatrixMultiplication((this.delta2));

    }

    Cost(Matrix_Input, y_ ){

        var  X = Matrix_Input;
        var  Y = y_;

        this.m_yHat = this.Forward_Prop(X);




        let tempJ = this.m_yHat.Subtract(Y);
        var avg = tempJ.Average();
        return  .5*Math.pow( avg,2);


    }

    Train( Matrix_Input, correct_Val){

        var Train_condition = true;

        this.y_cor = correct_Val;
        var iterations = 0;

        this.m_yHat= this.Forward_Prop(Matrix_Input);
        this.ComputeDerivatives(Matrix_Input,this.y_cor);

        var mt_1 = new Matrix(this.W_1.m_rows,this.W_1.m_cols);
        mt_1.Fill(0);
        var mt_2 = new Matrix(this.W_2.m_rows,this.W_2.m_cols);
        mt_2.Fill(0);


        var beta =.9;


        var alpha_1 = new Matrix(this.W_1.m_rows,this.W_1.m_cols);
        alpha_1.Fill(1-beta);
        var alpha_2 = new Matrix(this.W_2.m_rows,this.W_2.m_cols);
        alpha_2.Fill(1-beta);


        var beta_1 = new Matrix(this.W_1.m_rows,this.W_1.m_cols);
        beta_1.Fill(beta);
        var beta_2 = new Matrix(this.W_2.m_rows,this.W_2.m_cols);
        beta_2.Fill(beta);



        var Learning_1 = new Matrix(this.W_1.m_rows,this.W_1.m_cols);
        Learning_1.Fill(this.m_LearningRate );
        var Learning_2 = new Matrix(this.W_2.m_rows,this.W_2.m_cols);
        Learning_2.Fill(this.m_LearningRate);

        while(Train_condition && iterations <5000){


            this.ComputeDerivatives(Matrix_Input,this.y_cor);

             var J = this.Cost(Matrix_Input,this.y_cor);


             if( J < this.m_alpha){

                 Train_condition = false;
             }

            mt_1 =  beta_1.Multiply(mt_1).Add(  alpha_1.Multiply(this.dJdW1) );
            mt_2 =  beta_2.Multiply(mt_2).Add(  alpha_2.Multiply(this.dJdW2) );


            this.W_1 = this.W_1.Subtract( Learning_1.Multiply(  beta_1.Multiply(mt_1)  )  );
            this.W_2 = this.W_2.Subtract( Learning_2.Multiply(  beta_2.Multiply(mt_2)  )  );

             iterations++;


        }

        console.log(iterations,"<<<<< iterations");

    }

}


var NN = new NeuralNetwork(2,2,4,2,.0001,1);

var Input_X = new Matrix(2,2);
Input_X.Fill(.2);

var out_Y = new Matrix(2,2);
out_Y.Fill(1);

NN.Train(Input_X,out_Y);

NN.Prediction(Input_X).Print();



console.log("outscript");