public class names {
    String nconst;
    String name;

    public names(String nconst, String name){
        this.nconst = nconst;
        this.name = name;
    }

    public void print(){
        String line = nconst + " " + name;
        System.out.println(line);
    }

    public String get_nconst(){
        return this.nconst;
    }

    public String get_name(){
        return this.name;
    }
}
