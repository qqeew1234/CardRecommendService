package CardRecommendService.Classification;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClassificationController {

    private ClassificationService classificationService;

    public ClassificationController(ClassificationService classificationService) {
        this.classificationService = classificationService;
    }

    @PostMapping
    public void createclassification(@RequestBody CreateClassificationRequest request) {
        classificationService.createClassification(request);
    }

    @GetMapping
    public List<ClassificationResponse> getClassificationList() {
        return classificationService.getClassificationList();
    }

    @DeleteMapping
    public void deleteClassification(@PathVariable Long classificationId) {
        classificationService.deleteClassification(classificationId);
    }





}
