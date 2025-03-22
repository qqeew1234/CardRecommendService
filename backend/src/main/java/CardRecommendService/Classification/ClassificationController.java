package CardRecommendService.Classification;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClassificationController {

    private ClassificationService classificationService;

    public ClassificationController(ClassificationService classificationService) {
        this.classificationService = classificationService;
    }

    //분류 생성
    @PostMapping("/classifications")
    public void createClassification(@RequestBody CreateClassificationRequest request) {
        classificationService.createClassification(request);
    }

    //분류 목록 조회
    @GetMapping("/classifications")
    public List<ClassificationResponse> getClassificationList() {
        return classificationService.getClassificationList();
    }

    //분류 삭제
    @DeleteMapping("/classifications/{classificationId}")
    public void deleteClassification(@PathVariable Long classificationId) {
        classificationService.deleteClassification(classificationId);
    }

}