// createClassifications.tsx
export async function createClassifications(uid: string, origin: string) {
    // API에 전송할 분류 목록 (예시)
    const classifications = [
        { uuid: uid, name: "의류" },
        { uuid: uid, name: "식량" },
        { uuid: uid, name: "주거" },
        { uuid: uid, name: "기타" },
    ];

    for (const classification of classifications) {
        const response = await fetch(`${origin}/classifications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(classification),
        });

        if (!response.ok) {
            console.error("분류 데이터를 생성하는 데 실패했습니다:", classification);
            // 필요시 추가 에러 처리를 구현할 수 있습니다.
        }
    }
}
