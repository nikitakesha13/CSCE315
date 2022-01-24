import java.awt.BorderLayout;
import java.awt.Color;
import java.util.Vector;
import javax.swing.*;
import javax.swing.plaf.PanelUI;
import javax.swing.text.AttributeSet.ColorAttribute;
import java.awt.*;
// import java.awt.BorderLayout;
// import java.awt.Color;
import java.awt.GridLayout;
import java.awt.event.ActionListener;
import java.sql.SQLException;
import java.awt.event.ActionEvent;
// import java.awt.Toolkit;
public class titleList {

    static jdbcpostgreSQL data_base;

    static String[] comm = {"SELECT * FROM titles;",
                        "SELECT * FROM titles WHERE numvotes > 1000000;",
                        "SELECT * FROM titles WHERE averagerating > 9.9;",
                        "SELECT * FROM crew WHERE titleid = ",
                        "SELECT * FROM names WHERE nconst = ",
                        "SELECT * FROM principals WHERE titleid = "};

    private Integer index3 = 0; // all titles
    private Integer index1 = 0; // num votes
    private Integer index2 = 0; // average rating

    JFrame frame = new JFrame();
    JPanel search_panel = new JPanel();
    JPanel main_panel = new JPanel();
    JPanel main_west = new JPanel();
    JPanel main_east = new JPanel();
    JPanel panel1 = new JPanel(); // popular
    JPanel panel2 = new JPanel(); // average rating
    JPanel panel3 = new JPanel(); // all titles

    JPanel panel1_top = new JPanel();
    JPanel panel1_west = new JPanel();
    JPanel panel1_east = new JPanel();
    JPanel panel1_center = new JPanel(); // the most popular 
    JLabel popular_label = new JLabel();

    JPanel panel2_top = new JPanel();
    JPanel panel2_west = new JPanel();
    JPanel panel2_east = new JPanel();
    JPanel panel2_center = new JPanel(); // the average rating
    JLabel rate_label = new JLabel();

    JPanel panel3_top = new JPanel();
    JPanel panel3_west = new JPanel();
    JPanel panel3_east = new JPanel();
    JPanel panel3_center = new JPanel(); // all titles
    JLabel titles_label = new JLabel();

    JButton arrow_for_button3 = new JButton(); // back and forward buttons for all titles
    JButton arrow_back_button3 = new JButton();

    JButton arrow_for_button1 = new JButton(); // back and forward buttons for num votes
    JButton arrow_back_button1 = new JButton();

    JButton arrow_for_button2 = new JButton(); // back and forward buttons for average rating
    JButton arrow_back_button2 = new JButton();

    Vector<JButton> button_list3 = new Vector<JButton>(); // all titles vector buttons
    Vector<JButton> button_list1 = new Vector<JButton>(); // num votes vector buttons
    Vector<JButton> button_list2 = new Vector<JButton>(); // average rating vector buttons

    public void clean_buttons(Vector<JButton> buttons, JPanel panel_to_remove){
        for (Integer i = 0; i < buttons.size(); ++i){
            panel_to_remove.remove(buttons.get(i));
        }
    }

    public void button_update(Vector<title> vec_elem, Integer ind, String name){
        System.out.println(name);
        System.out.println(ind);
        for (Integer x = 0; x < 5; ++x){
            JButton button = new JButton();
            // button.setBounds(bound_x, bound_y, 250, 100);
            button.setText(vec_elem.get(ind).to_str());
            System.out.println(vec_elem.get(ind).to_str());
            button.setBackground(Color.BLUE);

            String titleid = vec_elem.get(ind).get_title();
            String title_name = vec_elem.get(ind).get_orig();
            button.addActionListener(actionEvent -> {
                crew new_crew = null;
                Vector<principals> vec_prin = new Vector<>();
                String director = ""; // the name of the director
                String writor = ""; // the name of the writor

                try {
                    new_crew = data_base.get_crew(comm[3] + "\'" + titleid + "\'" + ";");
                } catch (SQLException e) {
                    e.printStackTrace();
                }

                if (new_crew != null){ 
                    director = new_crew.get_director(); 
                    writor = new_crew.get_writor();
                    try {
                        if (director != "unknown") { director = data_base.get_name(comm[4] + "\'" + director + "\'" + ";").get_name(); }
                        if (writor != "unknown") { writor = data_base.get_name(comm[4] + "\'" + writor + "\'" + ";").get_name(); }
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }
                }
                else {
                    director = "unknown";
                    writor = "unknown";
                }
                

                try {
                    vec_prin = data_base.get_principal(comm[5] + "\'" + titleid + "\';");
                } catch (SQLException e) {
                    e.printStackTrace();
                }

                JFrame pop_frame = new JFrame();
                pop_frame.setSize(900, 900);
                pop_frame.setTitle("More Info");
                pop_frame.setLayout(new BorderLayout());

                JPanel top_panel = new JPanel();
                JLabel top_label = new JLabel();
                top_label.setText(title_name);
                top_label.setFont(new Font("MV Boli", Font.PLAIN, 20));
                top_panel.setBackground(Color.GREEN);
                top_panel.add(top_label);
                pop_frame.add(top_panel, BorderLayout.NORTH);

                JPanel center_panel = new JPanel();
                center_panel.setLayout(new GridLayout(vec_prin.size() + 2, 1, 10, 10));

                JLabel director_label = new JLabel();
                director_label.setText("Director: " + director);
                center_panel.add(director_label);

                JLabel writor_label = new JLabel();
                writor_label.setText("Writor: " + writor);
                center_panel.add(writor_label);
                
                if (vec_prin != null){
                    for (principals curr_prin: vec_prin){
                        JLabel prin_label = new JLabel();
                        prin_label.setBackground(Color.GREEN);
                        String nconst = curr_prin.get_nconst();
                        names curr_name = null;
                        try {
                            curr_name = data_base.get_name(comm[4] + "\'" + nconst + "\'" + ";");
                        } catch (SQLException e) {
                            e.printStackTrace();
                        }
                        prin_label.setText(curr_name.get_name() + ": " + curr_prin.get_category());
                        center_panel.add(prin_label);
                    }
                }
                else {
                    JLabel no_label = new JLabel();
                    no_label.setBackground(Color.GREEN);
                    no_label.setText("The principals list does not exist for this title");
                    center_panel.add(no_label);
                }

                center_panel.setBackground(Color.RED);
                pop_frame.add(center_panel, BorderLayout.CENTER);
                pop_frame.setVisible(true);

            });
            ++ind;
            if (name == "all titles"){
                panel3_center.add(button);
                button_list3.add(button);
            }
            else if (name == "num votes"){
                panel1_center.add(button);
                button_list1.add(button);
            }
            else if (name == "average rating"){
                panel2_center.add(button);
                button_list2.add(button);
            }
        }

        if (name == "all titles"){
            if (ind == 5){
                panel3_west.remove(arrow_back_button3);
                System.out.println("I removed the back button for all titles");
            }
            panel3_west.revalidate();
            panel3_west.repaint();
            index3 = ind;
        }
        else if (name == "num votes"){
            if (ind == 5){
                panel1_west.remove(arrow_back_button1);
                System.out.println("I removed the back button for num votes");
            }
            panel1_west.revalidate();
            panel1_west.repaint();
            index1 = ind;
        }
        else if (name == "average rating"){
            if (ind == 5){
                panel2_west.remove(arrow_back_button2);
                System.out.println("I removed the back button for average rating");
            }
            panel2_west.revalidate();
            panel2_west.repaint();
            index2 = ind;
        }
    }

    public titleList(Vector<title> all, Vector<title> num_votes, Vector<title> rate) {

        panel1_center.setBackground(Color.LIGHT_GRAY);
        panel1_top.setBackground(Color.LIGHT_GRAY);
        panel1_west.setBackground(Color.LIGHT_GRAY);
        panel1_east.setBackground(Color.LIGHT_GRAY);

        panel1_center.setPreferredSize(new Dimension(100, 100));
        panel1_top.setPreferredSize(new Dimension(100, 50));
        panel1_west.setPreferredSize(new Dimension(100, 100));
        panel1_east.setPreferredSize(new Dimension(100, 100));
        panel1_center.setLayout(new GridLayout(1, 5, 10, 10));
        panel1_west.setLayout(new GridLayout());
        panel1_east.setLayout(new GridLayout());
        popular_label.setText("Popular:");
        popular_label.setFont(new Font("MV Boli", Font.PLAIN, 20));

        panel2_center.setBackground(Color.LIGHT_GRAY);
        panel2_top.setBackground(Color.LIGHT_GRAY);
        panel2_west.setBackground(Color.LIGHT_GRAY);
        panel2_east.setBackground(Color.LIGHT_GRAY);

        panel2_center.setPreferredSize(new Dimension(100, 100));
        panel2_top.setPreferredSize(new Dimension(100, 50));
        panel2_west.setPreferredSize(new Dimension(100, 100));
        panel2_east.setPreferredSize(new Dimension(100, 100));
        panel2_center.setLayout(new GridLayout(1, 5, 10, 10));
        panel2_west.setLayout(new GridLayout());
        panel2_east.setLayout(new GridLayout());
        rate_label.setText("Highest rating movies:");
        rate_label.setFont(new Font("MV Boli", Font.PLAIN, 20));

        panel3_center.setBackground(Color.LIGHT_GRAY);
        panel3_top.setBackground(Color.LIGHT_GRAY);
        panel3_west.setBackground(Color.LIGHT_GRAY);
        panel3_east.setBackground(Color.LIGHT_GRAY);

        panel3_center.setPreferredSize(new Dimension(100, 100));
        panel3_top.setPreferredSize(new Dimension(100, 50));
        panel3_west.setPreferredSize(new Dimension(100, 100));
        panel3_east.setPreferredSize(new Dimension(100, 100));
        panel3_center.setLayout(new GridLayout(1, 5, 10, 10));
        panel3_west.setLayout(new GridLayout());
        panel3_east.setLayout(new GridLayout());
        titles_label.setText("All:");
        titles_label.setFont(new Font("MV Boli", Font.PLAIN, 20));

        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(900, 900);
        frame.setTitle("The User View");
        frame.setLayout(new BorderLayout());

        main_panel.setLayout(new BoxLayout(main_panel, BoxLayout.PAGE_AXIS));
        main_panel.setPreferredSize(new Dimension(300, 300));

        panel1.setBackground(Color.RED);
        panel2.setBackground(Color.BLUE);
        panel3.setBackground(Color.YELLOW);

        panel1.setLayout(new BorderLayout(10, 10));
        panel2.setLayout(new BorderLayout(10, 10));
        panel3.setLayout(new BorderLayout(10, 10));

        search_panel.setBackground(Color.GREEN);
        main_east.setBackground(Color.BLUE);
        main_west.setBackground(Color.BLUE);
        search_panel.setPreferredSize(new Dimension(100, 100));
        main_east.setPreferredSize(new Dimension(100, 100));
        main_west.setPreferredSize(new Dimension(100, 100));

        button_update(num_votes, index1, "num votes");
        button_update(rate, index2, "average rating");
        button_update(all, index3, "all titles");

        arrow_for_button1.setText(">");
        arrow_back_button1.setText("<");
        panel1_east.add(arrow_for_button1);

        arrow_for_button2.setText(">");
        arrow_back_button2.setText("<");
        panel2_east.add(arrow_for_button2);

        arrow_for_button3.setText(">");
        arrow_back_button3.setText("<");
        panel3_east.add(arrow_for_button3);

        arrow_for_button1.addActionListener(actionEvent -> {
            clean_buttons(button_list1, panel1_center);
            panel1_west.add(arrow_back_button1);
            button_update(num_votes, index1, "num votes");
            System.out.println("arrow forward clicked num votes");
        });

        arrow_back_button1.addActionListener(actionEvent -> {
            if (index1 >= 10){
                index1 -= 10;
                clean_buttons(button_list1, panel1_center);
                button_update(num_votes, index1, "num votes");
                System.out.println("arrow backword clicked num votes");
            }
        });

        arrow_for_button2.addActionListener(actionEvent -> {
            clean_buttons(button_list2, panel2_center);
            panel2_west.add(arrow_back_button2);
            button_update(rate, index2, "average rating");
            System.out.println("arrow forward clicked num votes");
        });

        arrow_back_button2.addActionListener(actionEvent -> {
            if (index2 >= 10){
                index2 -= 10;
                clean_buttons(button_list2, panel2_center);
                button_update(rate, index2, "average rating");
                System.out.println("arrow backword clicked num votes");
            }
        });

        arrow_for_button3.addActionListener(actionEvent -> {
            clean_buttons(button_list3, panel3_center);
            panel3_west.add(arrow_back_button3);
            button_update(all, index3, "all titles");
            System.out.println("arrow forward clicked num votes");
        });

        arrow_back_button3.addActionListener(actionEvent -> {
            if (index3 >= 10){
                index3 -= 10;
                clean_buttons(button_list3, panel3_center);
                button_update(all, index3, "all titles");
                System.out.println("arrow backword clicked num votes");
            }
        });

        panel1_top.add(popular_label);
        panel2_top.add(rate_label);
        panel3_top.add(titles_label);
        
        panel1.add(panel1_top, BorderLayout.NORTH);
        panel1.add(panel1_center, BorderLayout.CENTER);
        panel1.add(panel1_west, BorderLayout.WEST);
        panel1.add(panel1_east, BorderLayout.EAST);

        panel2.add(panel2_top, BorderLayout.NORTH);
        panel2.add(panel2_center, BorderLayout.CENTER);
        panel2.add(panel2_west, BorderLayout.WEST);
        panel2.add(panel2_east, BorderLayout.EAST);

        panel3.add(panel3_top, BorderLayout.NORTH);
        panel3.add(panel3_center, BorderLayout.CENTER);
        panel3.add(panel3_west, BorderLayout.WEST);
        panel3.add(panel3_east, BorderLayout.EAST);

        main_panel.add(panel1);
        main_panel.add(panel2);
        main_panel.add(panel3);

        frame.add(main_panel, BorderLayout.CENTER);
        frame.add(search_panel, BorderLayout.NORTH);
        frame.add(main_west, BorderLayout.WEST);
        frame.add(main_east, BorderLayout.EAST);

        frame.setVisible(true);
    }
    public static void main(String[] args) throws SQLException{
        
        data_base = new jdbcpostgreSQL();
        Vector<title> title = data_base.get_title(comm[0]); // all titles
        Vector<title> num_votes = data_base.get_title(comm[1]);
        Vector<title> rate = data_base.get_title(comm[2]);

        // This is testing 
        // title.get(5).print();
        // System.out.println(comm[3] + "\'" + title.get(3).get_title() + "\';");
        // crew new_crew = data_base.get_crew(comm[3] + "\'tt0073822\';");
        // if (new_crew != null){
        //     String director = new_crew.get_director();
        //     String writor = new_crew.get_writor();
        //     String titleid = new_crew.get_title();
        //     new_crew.print();
        // }

        // names director_name = data_base.get_name(comm[4] + "\'" + director + "\'" + ";");
        // names writor_name = data_base.get_name(comm[4] + "\'" + writor + "\'" + ";");
        // director_name.print();
        // writor_name.print();

        // Vector<principals> vec_prin = data_base.get_principal(comm[5] + "\'" + titleid + "\'" + ";");
        // for (principals x: vec_prin){
        //     x.print();
        // }

        // System.out.println(num_votes.size());
        // System.out.println(rate.size());
        new titleList(title, num_votes, rate); // create the frame 

    }
}
