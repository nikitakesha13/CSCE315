public class principals {
    String titleid;
    String nconst;
    String category;

    public principals(String titleid, String nconst, String category){
        this.titleid = titleid;
        this.nconst = nconst;
        this.category = category;
    }

    public void print(){
        String line = titleid + " " + nconst + " " + category;
        System.out.println(line);
    }

    public String get_title(){
        return this.titleid;
    }

    public String get_nconst(){
        return this.nconst;
    }

    public String get_category(){
        return this.category;
    }
}
