export const translations = {
    ko: {
        // Header
        header: {
            dashboard: '대시보드',
            login: '로그인',
            upload: '업로드',
        },
        // Hero Section
        hero: {
            badge: '프롬프트 레시피',
            title: '상상을 현실로 만드는',
            titleHighlight: '최고의 AI 레시피',
            description: '검증된 프롬프트 하나로 당신의 AI 창작물 퀄리티를 혁신하세요.',
            descriptionSub: '전 세계 크리에이터들의 노하우를 지금 바로 내 것으로.',
            searchPlaceholder: '어떤 스타일의 프롬프트를 찾고 있나요?',
            searchButton: '레시피 찾기',
            features: {
                instant: '즉시 접근',
                preview: '고화질 미리보기',
                copy: '바로 복사',
            },
        },
        // Main Section
        main: {
            title: 'AI 프롬프트 레시피',
            subtitle: '최고의 프롬프트를 복사해서 바로 사용하세요.',
            categories: {
                images: '이미지',
                videos: '영상',
            },
            sort: {
                latest: '최신',
                popular: '인기',
            },
            loading: '새로운 레시피를 가져오는 중...',
            noResults: '검색 결과가 없습니다',
            noResultsSub: '다른 검색어로 시도해보세요.',
        },
        // Detail Modal
        detail: {
            creator: '크리에이터',
            aiModel: 'AI 모델',
            appreciation: '응원하기',
            promptRecipe: '프롬프트 레시피',
            copyPrompt: '프롬프트 복사',
            openImage: '원본 이미지 보기',
            openVideo: '원본 영상 보기',
        },
        // Dashboard
        dashboard: {
            title: '내 레시피',
            editProfile: '프로필 수정',
            stats: {
                total: '전체',
                images: '이미지',
                videos: '영상',
                likes: '받은 좋아요',
                copies: '퍼간 횟수',
            },
            noPosts: '아직 업로드한 레시피가 없습니다',
            noPostsSub: '첫 AI 레시피를 공유해보세요!',
            uploadFirst: '첫 레시피 업로드',
        },
        // Upload Modal
        upload: {
            title: '새 프롬프트 등록',
            imageTab: '이미지',
            videoTab: '영상',
            recipeTitle: '작품 제목',
            titlePlaceholder: '예: 사이버펑크 고양이',
            mediaLabel: '이미지 (URL 또는 파일 업로드)',
            mediaLabelVideo: '영상 (URL 또는 파일 업로드)',
            mediaPlaceholder: 'https://... 또는 우측 버튼으로 업로드',
            fileUploaded: '파일 업로드됨',
            mediaHelpImage: '* 이미지 URL을 입력하거나 직접 업로드하세요.',
            mediaHelpVideo: '* 영상 URL을 입력하거나 직접 업로드하세요. (최대 5MB)',
            aiModel: '사용된 모델',
            promptRecipe: '프롬프트 (Recipe)',
            promptPlaceholder: '작품을 생성하기 위해 사용한 프롬프트를 입력하세요...',
            uploading: '저장 중...',
            uploadButton: '갤러리에 등록하기',
            errorVideoSize: '영상 파일 용량이 5MB를 초과했습니다.',
            errorVideoOnly: '영상 파일은 5MB 이하만 업로드 가능합니다.',
        },
        // Login Modal
        login: {
            title: '로그인',
            signupTitle: '회원가입',
            email: '이메일',
            emailPlaceholder: '이메일을 입력하세요',
            password: '비밀번호',
            passwordPlaceholder: '비밀번호를 입력하세요',
            loginButton: '로그인',
            signupButton: '회원가입',
            googleLogin: 'Google로 로그인',
            switchToSignup: '계정이 없으신가요? 회원가입',
            switchToLogin: '이미 계정이 있으신가요? 로그인',
            loggingIn: '로그인 중...',
            signingUp: '가입 중...',
        },
        // Profile Edit Modal
        profileEdit: {
            title: '프로필 수정',
            uploadPhoto: '프로필 사진 업로드',
            displayName: '표시 이름',
            namePlaceholder: '이름을 입력하세요',
            bio: '소개',
            bioPlaceholder: '자기소개를 입력하세요',
            cancel: '취소',
            saving: '저장 중...',
            save: '저장',
        },
        // Artist Gallery Modal
        artistGallery: {
            recipes: '레시피',
            posts: '게시물',
            totalLikes: '좋아요',
            avgLikes: '평균 좋아요',
            close: '닫기',
        },
        // Prompt Card
        promptCard: {
            copy: '복사',
            by: '작성자',
            promptRecipe: '프롬프트 레시피',
            unlockRecipe: '레시피 잠금 해제 (Click)',
        },
        // Toast Messages
        toast: {
            loginRequired: '로그인이 필요합니다',
            promptCopied: '프롬프트가 복사되었습니다!',
            uploadSuccess: '레시피가 업로드되었습니다!',
            profileUpdated: '프로필이 업데이트되었습니다!',
            error: '오류가 발생했습니다',
        },
        // Footer
        footer: {
            privacy: '개인정보 처리방침',
            terms: '서비스 이용약관',
            report: '오류 제보',
            language: 'English',
            company: 'Next Idea Lab',
            ceo: '대표자명: NIL Park',
            address: '주소: 경기도 용인시',
            phone: '',
            businessNumber: '',
            email: '메일: nextidealab.ai@gmail.com',
            copyright: 'Next Idea Lab. All rights reserved.',
        },
    },
    en: {
        // Header
        header: {
            dashboard: 'Dashboard',
            login: 'Sign In',
            upload: 'Upload',
        },
        // Hero Section
        hero: {
            badge: 'Prompt Recipe',
            title: 'Turn Your Imagination',
            titleHighlight: 'Into Reality with AI',
            description: 'Revolutionize your AI creations with proven prompts.',
            descriptionSub: 'Get instant access to creators\' know-how from around the world.',
            searchPlaceholder: 'What style of prompt are you looking for?',
            searchButton: 'Explore Now',
            features: {
                instant: 'Instant Access',
                preview: 'HD Previews',
                copy: 'One-Click Copy',
            },
        },
        // Main Section
        main: {
            title: 'Discover AI Recipes',
            subtitle: 'Copy the best prompts and use them right away.',
            categories: {
                images: 'Images',
                videos: 'Videos',
            },
            sort: {
                latest: 'Latest',
                popular: 'Popular',
            },
            loading: 'Loading new recipes...',
            noResults: 'No results found',
            noResultsSub: 'Try a different search term.',
        },
        // Detail Modal
        detail: {
            creator: 'Creator',
            aiModel: 'AI Model',
            appreciation: 'Appreciation',
            promptRecipe: 'Prompt Recipe',
            copyPrompt: 'Copy Prompt',
            openImage: 'Open Original Image',
            openVideo: 'Open Original Video',
        },
        // Dashboard
        dashboard: {
            title: 'My Recipes',
            editProfile: 'Edit Profile',
            stats: {
                total: 'Total',
                images: 'Images',
                videos: 'Videos',
                likes: 'Likes Received',
                copies: 'Times Copied',
            },
            noPosts: 'No recipes uploaded yet',
            noPostsSub: 'Share your first AI recipe!',
            uploadFirst: 'Upload First Recipe',
        },
        // Upload Modal
        upload: {
            title: 'Register New Prompt',
            imageTab: 'Image',
            videoTab: 'Video',
            recipeTitle: 'Project Title',
            titlePlaceholder: 'e.g., Cyberpunk Cat',
            mediaLabel: 'Image (URL or File Upload)',
            mediaLabelVideo: 'Video (URL or File Upload)',
            mediaPlaceholder: 'https://... or upload using the button on the right',
            fileUploaded: 'File Uploaded',
            mediaHelpImage: '* Enter an image URL or upload directly.',
            mediaHelpVideo: '* Enter a video URL or upload directly. (Max 5MB)',
            aiModel: 'Model Used',
            promptRecipe: 'Prompt (Recipe)',
            promptPlaceholder: 'Enter the prompt you used to generate this work...',
            uploading: 'Saving...',
            uploadButton: 'Register to Gallery',
            errorVideoSize: 'Video file size exceeds 5MB.',
            errorVideoOnly: 'Video files can only be up to 5MB.',
        },
        // Login Modal
        login: {
            title: 'Sign In',
            signupTitle: 'Sign Up',
            email: 'Email',
            emailPlaceholder: 'Enter your email',
            password: 'Password',
            passwordPlaceholder: 'Enter your password',
            loginButton: 'Sign In',
            signupButton: 'Sign Up',
            googleLogin: 'Sign in with Google',
            switchToSignup: 'Don\'t have an account? Sign up',
            switchToLogin: 'Already have an account? Sign in',
            loggingIn: 'Signing in...',
            signingUp: 'Signing up...',
        },
        // Profile Edit Modal
        profileEdit: {
            title: 'Edit Profile',
            uploadPhoto: 'Upload Profile Photo',
            displayName: 'Display Name',
            namePlaceholder: 'Enter your name',
            bio: 'Bio',
            bioPlaceholder: 'Tell us about yourself',
            cancel: 'Cancel',
            saving: 'Saving...',
            save: 'Save',
        },
        // Artist Gallery Modal
        artistGallery: {
            recipes: 'Recipes',
            posts: 'Posts',
            totalLikes: 'Total Likes',
            avgLikes: 'Avg Likes',
            close: 'Close',
        },
        // Prompt Card
        promptCard: {
            copy: 'Copy',
            by: 'By',
            promptRecipe: 'PROMPT RECIPE',
            unlockRecipe: 'Unlock Recipe (Click)',
        },
        // Toast Messages
        toast: {
            loginRequired: 'Please sign in to continue',
            promptCopied: 'Prompt copied to clipboard!',
            uploadSuccess: 'Recipe uploaded successfully!',
            profileUpdated: 'Profile updated successfully!',
            error: 'An error occurred',
        },
        // Footer
        footer: {
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
            report: 'Report Bug',
            language: '한국어',
            company: 'Next Idea Lab',
            ceo: 'CEO: NIL Park',
            address: 'Address: Gyeonggi-do, Yongin-si',
            phone: '',
            businessNumber: '',
            email: 'Email: nextidealab.ai@gmail.com',
            copyright: 'Next Idea Lab. All rights reserved.',
        },
    },
};
