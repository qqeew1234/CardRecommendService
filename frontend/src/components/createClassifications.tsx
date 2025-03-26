// createClassifications.tsx
export async function createClassifications(uid: string, origin: string) {
    // API에 전송할 분류 목록 (예시)
    const classifications = [
        { uuid: uid, title: "의류비" },
        { uuid: uid, title: "식사비" },
        { uuid: uid, title: "주거비" },
        { uuid: uid, title: "기타비용" },
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
