public class crew {
    String titleid;
    String directors;
    String writors;

    public crew(String titleid, String directors, String writers){
        this.titleid = titleid;
        this.directors = directors;
        this.writors = writers;
    }

    public void print(){
        String line = "";
        line = titleid + " " + directors + " " + writors;
        System.out.println(line);
    }

    public String get_director(){
        return this.directors;
    }

    public String get_writor(){
        return this.writors;
    }

    public String get_title(){
        return this.titleid;
    }
}
