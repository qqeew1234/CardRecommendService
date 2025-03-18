package CardRecommendService.Classification;

import CardRecommendService.cardHistory.CardHistory;
import CardRecommendService.cardHistory.CardHistoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassificationService {

    private final ClassificationRepository classificationRepository;
    private final CardHistoryRepository cardHistoryRepository;

    public ClassificationService(ClassificationRepository classificationRepository, CardHistoryRepository cardHistoryRepository) {
        this.classificationRepository = classificationRepository;
        this.cardHistoryRepository = cardHistoryRepository;
    }


    //분류 등록
    @Transactional
    public void createClassification(CreateClassificationRequest request) {

        Classification classification = new Classification(
                request.title()
        );

        classificationRepository.save(classification);
    }

    //분류 조회
    public List<ClassificationResponse> getClassificationList() {

        List<Classification> classifications = classificationRepository.findAll();

        return classifications.stream()
                .map(classification -> new ClassificationResponse(
                        classification.getTitle()
                ))
                .collect(Collectors.toList());
    }


    @Transactional
    public void deleteClassification(Long classificationId) {

        Classification classification = classificationRepository.findById(classificationId)
                .orElseThrow(() -> new RuntimeException("없는 분류"));

        classificationRepository.deleteById(classificationId);
    }

    List<CardHistory> userCardHistories = new ArrayList<>();

    // 숨김/보이기 상태 변경
    @Transactional
    public boolean updateClassificationCheckStatus(Long id, boolean isChecked) {
        // Classification 조회
        Classification classification = classificationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 분류가 존재하지 않습니다."));

        // 체크 상태 변경 (Classification의 체크 상태 업데이트)
        classification.setChecked(isChecked);

        // Classification에 소속된 모든 CardHistory 목록 조회
        List<CardHistory> cardHistories = classification.getCardHistories();

        // 체크 상태에 따라 CardHistory 목록을 추가하거나 제거
        if (isChecked) {
            // 체크 상태: 해당 CardHistory 목록을 리스트에 추가
            // 추가하려는 리스트가 있다고 가정 (예: userCardHistories)
            userCardHistories.addAll(cardHistories);
        } else {
            // 체크 해제 상태: 해당 CardHistory 목록을 리스트에서 제거
            // 제거하려는 리스트가 있다고 가정 (예: userCardHistories)
            userCardHistories.removeAll(cardHistories);
        }

        // 변경된 카드 히스토리 정보 저장
        cardHistoryRepository.saveAll(cardHistories);

        // Classification 정보 저장
        classificationRepository.save(classification);

        // 체크 상태 반환 (on/off 여부)
        return classification.isChecked();
    }









}


