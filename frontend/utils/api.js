/**
 * API URL을 가져오는 유틸리티 함수
 * 환경 변수 NEXT_PUBLIC_API_URL이 설정되어 있으면 사용하고,
 * 없으면 현재 호스트를 기반으로 생성합니다.
 */
export function getApiUrl() {
  // 환경 변수가 설정되어 있으면 우선 사용
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // 브라우저 환경에서만 실행
  if (typeof window !== 'undefined') {
    // 프로덕션 환경 (localhost가 아닌 경우)
    const isProduction = 
      window.location.hostname !== 'localhost' && 
      window.location.hostname !== '127.0.0.1';
    
    if (isProduction) {
      // 프로덕션: 현재 호스트 사용 (HTTPS)
      return `${window.location.protocol}//${window.location.host}`;
    }
  }

  // 기본값: 환경 변수가 없고 localhost인 경우 경고
  if (typeof window === 'undefined') {
    console.warn(
      'NEXT_PUBLIC_API_URL 환경 변수가 설정되지 않았습니다. ' +
      '.env.local 파일에 NEXT_PUBLIC_API_URL을 설정해주세요.'
    );
  }

  // SSR 또는 환경 변수가 없는 경우: null 반환 (명시적 에러 처리)
  return null;
}

/**
 * 상대 경로를 절대 URL로 변환
 * @param {string} relativePath - 상대 경로 (예: '/media/image.jpg')
 * @returns {string} 절대 URL
 */
export function toAbsoluteUrl(relativePath) {
  if (!relativePath) return relativePath;
  
  // 이미 절대 URL인 경우 그대로 반환
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }

  // 상대 경로인 경우 API URL 추가
  if (relativePath.startsWith('/')) {
    const apiUrl = getApiUrl();
    if (!apiUrl) {
      console.error('API URL을 가져올 수 없습니다. NEXT_PUBLIC_API_URL 환경 변수를 설정해주세요.');
      return relativePath;
    }
    return `${apiUrl}${relativePath}`;
  }

  return relativePath;
}

/**
 * HTTP URL을 HTTPS로 변환 (필요한 경우)
 * @param {string} url - 변환할 URL
 * @returns {string} 변환된 URL
 */
export function ensureHttps(url) {
  if (!url) return url;
  
  // HTTPS 페이지에서 HTTP URL을 HTTPS로 변환
  if (
    typeof window !== 'undefined' && 
    window.location.protocol === 'https:' && 
    url.startsWith('http://')
  ) {
    return url.replace('http://', 'https://');
  }

  return url;
}

/**
 * 미디어 URL을 처리하는 헬퍼 함수
 * @param {string} url - 원본 URL (절대 또는 상대)
 * @returns {string} 처리된 URL
 */
export function processMediaUrl(url) {
  if (!url) return url;
  
  // 1. 상대 경로를 절대 URL로 변환
  let processedUrl = toAbsoluteUrl(url);
  
  // 2. HTTPS 강제 (필요한 경우)
  processedUrl = ensureHttps(processedUrl);
  
  return processedUrl;
}

