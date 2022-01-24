public class title{
    String titleid;
    String type;
    String orig;
    String gen;
    Integer year;
    Float ave;
    Integer numvotes;
    Float run;

    public title(String titleid, String type, String orig, String gen, Integer year, Float ave, Integer numvotes, Float run){
        this.titleid = titleid;
        this.type = type;
        this.orig = orig;
        this.gen = gen;
        this.year = year;
        this.ave = ave;
        this.numvotes = numvotes;
        this.run = run;
    }

    public void print(){
        String line = "";
        if (run != null){ 
            line = titleid + " " + type + " " + orig + " " + run + " " + year + " " + ave + " " + numvotes;
        }
        else {
            line = titleid + " " + type + " " + orig + " " + year + " " + ave + " " + numvotes;
        }
        System.out.println(line);
    }

    public String to_str(){
        String line = "";
        if (run != null){ 
            line = type + " " + orig + " " + run + " " + year + " " + ave + " " + numvotes;
        }
        else {
            line = type + " " + orig + " " + year + " " + ave + " " + numvotes;
        }
        return line;
    }

    public String get_title(){
        return this.titleid;
    }

    public String get_type(){
        return this.type;
    }

    public String get_orig(){
        return this.orig;
    }

    public String get_gen(){
        return this.gen;
    }

    public Integer get_year(){
        return this.year;
    }

    public Float get_ave(){
        return this.ave;
    }

    public Integer get_numvotes(){
        return this.numvotes;
    }

    public Float get_run(){
        return this.run;
    }
}
