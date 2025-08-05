import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '20px',
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
              <rect x="9" y="9" width="1" height="1" />
              <rect x="14" y="9" width="1" height="1" />
              <rect x="9" y="14" width="6" height="1" />
            </svg>
          </div>
        </div>
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: '10px',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          Calculator.Startsim.AI
        </h1>
        <p
          style={{
            fontSize: '24px',
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            maxWidth: '600px',
            lineHeight: '1.4',
          }}
        >
          Professional Business Calculator Hub
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '30px',
            padding: '15px 30px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '30px',
            fontSize: '18px',
            color: 'white',
          }}
        >
          ✨ Premium calculators with GitHub login
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
