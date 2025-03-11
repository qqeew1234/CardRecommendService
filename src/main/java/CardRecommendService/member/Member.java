package CardRecommendService.member;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String nickname;

    private String password;

    private Gender gender;

    private int age;

    public Member(String email, String nickname, String password, Gender gender, int age) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.gender = gender;
        this.age = age;
    }

    public Member() {
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getNickname() {
        return nickname;
    }

    public String getPassword() {
        return password;
    }

    public Gender getGender() {
        return gender;
    }

    public int getAge() {
        return age;
    }
}
