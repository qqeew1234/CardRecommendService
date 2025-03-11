package CardRecommendService.member;

import CardRecommendService.memberCard.MemberCard;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private int age;

    @OneToMany(mappedBy = "member")
    private List<MemberCard> memberCard;

    public Member(String email, String nickname, String password, Gender gender, int age) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.gender = gender;
        this.age = age;
    }

    protected Member() {
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

    public List<MemberCard> getMemberCard() {
        return memberCard;
    }
}
