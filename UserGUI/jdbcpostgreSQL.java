import java.sql.*;
// import javax.swing.JOptionPane;
import java.util.Vector;

/*
CSCE 315
9-25-2019 Original
2/7/2020 Update for AWS
 */

//Commands to run this script
//This will compile all java files in this directory
//javac *.java 
//This command tells the file where to find the postgres jar which it needs to execute postgres commands, then executes the code
//Windows: java -cp ".;postgresql-42.2.8.jar" titleList
//Mac/Linux: java -cp ".:postgresql-42.2.8.jar" jdbcpostgreSQL

public class jdbcpostgreSQL {
  // Vector<title> vec_title = new Vector<title>();

  public ResultSet establish_connection(String comm){
    dbSetup my = new dbSetup();
    ResultSet result = null;
    //Building the connection
    Connection conn = null;
    String sectionNumber = "912"; // replace with your section number
    String groupNumber = "group5"; // replace with your group nymber
    // csce315911_group1db     csce911_group2_db   csce912_group1db ......
    String dbName = "csce315"+sectionNumber + "_" + groupNumber + "db";
    String dbConnectionString = "jdbc:postgresql://csce-315-db.engr.tamu.edu/" + dbName;
    // csce315911_group1user  csce911_group2user  csce912_group1user .....
    String userName = "csce315"+sectionNumber + "_" + groupNumber + "user";
    String userPassword = "password";
    try {
      conn = DriverManager.getConnection(dbConnectionString,userName, userPassword);
    } catch (Exception e) {
      e.printStackTrace();
      System.err.println(e.getClass().getName()+": "+e.getMessage());
      System.exit(0);
    }//end try catch
    System.out.println("Opened database successfully");
    try{
      //create a statement object
        Statement stmt = conn.createStatement();
        //create an SQL statement
        //TO DO: update the sql command here
        String sqlStatement = comm;
        //send statement to DBMS
        result = stmt.executeQuery(sqlStatement);

        //OUTPUT
        System.out.println("Query Results");
      //  System.out.println(result);
        System.out.println("______________________________________");
        
    } catch (Exception e){
      System.out.println("Error accessing Database.");
    }
    //closing the connection
    try {
      conn.close();
      System.out.println("Connection Closed.");
    } catch(Exception e) {
      System.out.println("Connection NOT Closed.");
    }
    return result;
  }

  public Vector<title> get_title(String comm) throws SQLException{
    ResultSet result = establish_connection(comm);
    Vector<title> vec_title = new Vector<>();
    String titleid = "";
    String type = "";
    String orig = "";
    String gen = "";
    Float run = (float) 0;
    Integer year = 0;
    Float ave = (float) 0;
    Integer numvote = 0;
    while (result.next()) {
      titleid = result.getString("titleid");
      type = result.getString("titletype");
      orig = result.getString("orginaltitle");
      gen = result.getString("genres");
      run = result.getFloat("runtimeminutes");
      if (result.wasNull()){
        run = (float) 0;
      }
      year = result.getInt("year");
      ave = result.getFloat("averagerating");
      numvote = result.getInt("numvotes");
      title new_title = new title(titleid, type, orig, gen, year, ave, numvote, run);
      vec_title.add(new_title);
    }
    return vec_title;
  }

  public crew get_crew(String comm) throws SQLException{
    ResultSet result = establish_connection(comm);
    crew new_crew = null;
    String titleid = "";
    String directors = "";
    String writors = "";
    if (result.next()){
      titleid = result.getString("titleid");
      directors = result.getString("directors");
      if (result.wasNull()){
        directors = "unknown";
      }
      writors = result.getString("writors");
      if (result.wasNull()){
        writors = "unknown";
      }
      new_crew = new crew(titleid, directors, writors);
    }
    return new_crew;
  }

  public names get_name(String comm) throws SQLException{
    ResultSet result = establish_connection(comm);
    names new_name = null;
    String nconst = "";
    String name = "";
    if (result.next()){
      nconst = result.getString("nconst");
      name = result.getString("primaryname");
      new_name = new names(nconst, name);
    }
    return new_name;
  }

  public Vector<principals> get_principal(String comm) throws SQLException{
    ResultSet result = establish_connection(comm);
    Vector<principals> vec_prin = new Vector<>();
    String titleid = "";
    String nconst = "";
    String category = "";
    while (result.next()){
      titleid = result.getString("titleid");
      nconst = result.getString("nconst");
      category = result.getString("category");
      principals prin = new principals(titleid, nconst, category);
      vec_prin.add(prin);
    }
    return vec_prin;
  }
}
