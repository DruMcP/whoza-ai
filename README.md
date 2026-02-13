# Rex - AI Visibility Management Platform

A comprehensive platform for managing and improving business visibility in AI-powered search results (ChatGPT, Perplexity, Google AI). Rex helps businesses get discovered when customers use AI tools to find services.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd project

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Run development server
npm run dev
```

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 📋 Features

### Core Features
- **Task Management System**: AI-powered task generation based on business profiles
- **Visibility Score Tracking**: Monitor your AI visibility score over time
- **Email Campaign Manager**: Automated email campaigns for user engagement
- **Notification System**: Multi-channel notifications (email, in-app)
- **Analytics Dashboard**: Comprehensive user and platform analytics
- **Admin Portal**: Complete administrative control panel

### Advanced Features
- **Automated Task Generation**: Template-based task creation with intelligent matching
- **Visibility Scoring Engine**: Multi-factor scoring algorithm
- **Real-time Analytics**: Track KPIs, conversion rates, and user engagement
- **Cohort Analysis**: User retention and lifetime value tracking
- **Role-based Access Control**: Secure admin and user separation
- **Row Level Security**: Database-level data isolation

## 🏗️ Architecture

This application uses a modern **serverless architecture** deployed on Supabase (AWS-backed):

```
Frontend (React 19 + Vite)
    ↓
CDN (Vercel - Global Edge Network)
    ↓
Authentication Layer (Supabase Auth)
    ↓
API Layer (Edge Functions + PostgREST)
    ↓
Security Layer (Row Level Security)
    ↓
Data Layer (PostgreSQL 15+)
    ↓
Storage Layer (Encrypted Backups)
```

## 🗄️ Database Schema

### Core Tables
- `users` - User accounts and authentication
- `business_profiles` - Business information
- `tasks` - Actionable items for users
- `task_templates` - Templates for task generation
- `visibility_scores` - Historical score tracking
- `visibility_score_details` - Detailed score breakdowns

### Analytics Tables
- `analytics_events` - Raw event tracking
- `user_engagement_metrics` - Aggregated user metrics
- `platform_metrics` - Platform-wide KPIs
- `user_cohorts` - Cohort analysis data
- `subscription_events` - Revenue tracking
- `user_lifetime_value` - Customer value analysis

### System Tables
- `notification_templates` - Email/notification templates
- `notification_delivery_log` - Delivery tracking
- `notification_preferences` - User preferences
- `email_campaigns` - Campaign management

## 🔒 Security

### Implemented Security Measures

**Data Encryption:**
- ✅ TLS 1.2+ for all connections
- ✅ AES-256 encryption at rest
- ✅ Encrypted backups
- ✅ Secure credential management

**Authentication & Authorization:**
- ✅ JWT-based authentication
- ✅ Bcrypt password hashing
- ✅ Row Level Security (RLS) on all tables
- ✅ Role-based access control
- ✅ Session management

**Application Security:**
- ✅ Input validation and sanitization
- ✅ XSS prevention (React auto-escaping)
- ✅ CSRF protection
- ✅ SQL injection prevention (parameterized queries)
- ✅ Rate limiting ready
- ✅ No secrets in code or logs

**Infrastructure Security:**
- ✅ DDoS protection
- ✅ Automated backups (daily)
- ✅ Geographic redundancy
- ✅ Monitoring and alerting
- ✅ Incident response plan

## 📊 Monitoring & Analytics

### Built-in Monitoring
- User engagement metrics
- Task completion rates
- Visibility score trends
- Platform KPIs (signups, conversions, churn)
- Revenue metrics (MRR, ARR, LTV)

### Performance Targets
- API Response Time: < 200ms (p95)
- Database Query Time: < 50ms (p95)
- Page Load Time: < 3 seconds
- Uptime: 99.9% (< 43 min downtime/month)
- Error Rate: < 1%

## 📈 Scalability

### Current Capacity
- **Estimated Users**: 1,000-5,000 active users
- **Database**: 8GB storage (expandable)
- **API Requests**: Unlimited
- **Concurrent Connections**: 200

### Scaling Strategy
```
Phase 1 (0-5K users):    Current architecture
Phase 2 (5-25K users):   Add caching, optimize queries
Phase 3 (25-100K users): Read replicas, connection pooling
Phase 4 (100K+ users):   Multi-region, database sharding
```

### Performance Optimizations
- 14+ database indexes
- Connection pooling (automatic)
- Serverless auto-scaling
- CDN for static assets
- Query optimization
- Efficient data structures

## 🧪 Testing

```bash
# Run tests (when available)
npm test

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## 📚 Documentation

Comprehensive documentation is available in the following files:

### Infrastructure & Operations
- **[INFRASTRUCTURE.md](./INFRASTRUCTURE.md)** - Complete infrastructure overview
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and data flows
- **[SCALABILITY.md](./SCALABILITY.md)** - Scaling strategies and capacity planning
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Pre-deployment verification

### Security & Compliance
- **[SECURITY.md](./SECURITY.md)** - Security measures and best practices
- **[MONITORING.md](./MONITORING.md)** - Monitoring, alerting, and observability

### Design & Development
- **[BRAND_STYLE_GUIDE.md](./BRAND_STYLE_GUIDE.md)** - Brand guidelines
- **[UI_DESIGN_GUIDE.md](./UI_DESIGN_GUIDE.md)** - UI/UX design principles

### API Integration Guides
- **[GOOGLE_PLACES_SETUP.md](./GOOGLE_PLACES_SETUP.md)** - Complete Google Places API setup guide
- **[GOOGLE_PLACES_INTEGRATION_SUMMARY.md](./GOOGLE_PLACES_INTEGRATION_SUMMARY.md)** - Integration overview and architecture
- **[API_INTEGRATION_STATUS.md](./API_INTEGRATION_STATUS.md)** - All API integrations status

### Testing & Quality
- **[FINAL_TEST_REPORT.md](./FINAL_TEST_REPORT.md)** - Comprehensive end-to-end testing
- **[PRODUCTION_READINESS_CHECKLIST.md](./PRODUCTION_READINESS_CHECKLIST.md)** - Production deployment guide
- **[LAUNCH_SUMMARY.md](./LAUNCH_SUMMARY.md)** - Quick reference for launch

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.2.3
- **Router**: React Router DOM 7.11.0
- **Build Tool**: Vite 7.3.0
- **Styling**: Vanilla CSS with CSS Variables
- **State Management**: React Context API

### Backend
- **Database**: PostgreSQL 15+ (Supabase)
- **API**: PostgREST (Automatic from schema)
- **Authentication**: Supabase Auth (GoTrue)
- **Serverless Functions**: Deno Runtime
- **Real-time**: Supabase Realtime

### Infrastructure
- **Frontend Hosting**: Vercel
- **Backend Platform**: Supabase (AWS-backed)
- **CDN**: Vercel Edge Network
- **SSL/TLS**: Automatic (Let's Encrypt)
- **Backups**: Automated daily (Supabase)

### Edge Functions (Deployed)
1. `send-email` - Email delivery
2. `send-notification` - Push notifications
3. `process-email-campaigns` - Bulk campaign processing
4. `process-notifications` - Notification batching
5. `process-analytics` - Daily metrics aggregation

## 🔧 Configuration

### Environment Variables

See `.env.example` for a complete list of configuration options.

**Required for Core Functionality:**
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Email Service (Required for Free VCS)
VITE_RESEND_API_KEY=your-resend-api-key
```

**Recommended for Production:**
```env
# Google Places API (Improves Free VCS accuracy from 30-55 to 40-75)
# See GOOGLE_PLACES_SETUP.md for setup instructions
# Cost: ~$1-3/month with caching
VITE_GOOGLE_PLACES_API_KEY=your-google-places-api-key
```

**Optional Enhancements:**
```env
# OpenAI (Rex AI decision engine, intelligent task generation)
VITE_OPENAI_API_KEY=your-openai-api-key

# Perplexity (Advanced AI visibility checks)
VITE_PERPLEXITY_API_KEY=your-perplexity-api-key
```

**Server-only (Never expose to client):**
```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Database Migrations

```bash
# Check migration status
supabase db status

# Apply migrations
supabase db push

# Create new migration
supabase migration new migration_name
```

### Edge Functions Deployment

```bash
# Deploy all functions
supabase functions deploy function-name

# View function logs
supabase functions logs function-name

# List deployed functions
supabase functions list
```

## 📝 Development Workflow

### Git Workflow
1. Create feature branch from `main`
2. Make changes and commit
3. Push to remote
4. Create pull request
5. Review and merge
6. Automatic deployment to Netlify

### Code Standards
- Use functional components with hooks
- Follow ESLint configuration
- Write meaningful commit messages
- Document complex logic
- Keep files focused (single responsibility)

### Database Changes
1. Create migration file
2. Write SQL with comments
3. Test migration locally
4. Apply to staging
5. Verify functionality
6. Apply to production

## 🚨 Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

**Database Connection Issues:**
```bash
# Check environment variables
echo $VITE_SUPABASE_URL

# Verify Supabase status
# Visit: https://status.supabase.com
```

**Authentication Problems:**
```bash
# Clear browser localStorage
localStorage.clear()

# Check JWT token validity
# Use jwt.io to decode token
```

## 📞 Support

### Internal Resources
- Supabase Dashboard: https://app.supabase.com
- Vercel Dashboard: https://vercel.com/dashboard
- Documentation: See links above

### External Support
- Supabase Support: support@supabase.io
- Supabase Community: https://github.com/supabase/supabase/discussions
- Vercel Support: https://vercel.com/support

## 🔐 Security Vulnerability Reporting

If you discover a security vulnerability, please email: security@yourapp.com

**Please do not create public GitHub issues for security vulnerabilities.**

## 📊 Key Metrics

### Business Metrics
- **User Acquisition**: Track signups and conversion
- **User Engagement**: Monitor task completion and logins
- **Revenue Metrics**: MRR, ARR, LTV
- **Retention**: Cohort analysis and churn tracking

### Technical Metrics
- **Performance**: Response times, load times
- **Reliability**: Uptime, error rates
- **Scalability**: Resource usage, capacity
- **Security**: Failed auth attempts, RLS violations

## 🗺️ Roadmap

### Completed ✅
- Core task management system
- Visibility scoring engine
- Email campaign manager
- Notification system
- Analytics dashboard
- Admin portal
- Security implementation (RLS, encryption)
- Automated backups
- Monitoring and alerting

### In Progress 🚧
- Performance optimization
- Advanced analytics
- User onboarding flow

### Planned 📋
- Multi-factor authentication (2FA)
- Mobile app (React Native)
- API for third-party integrations
- Advanced reporting
- A/B testing framework
- Internationalization (i18n)

## 📄 License

[Your License Here]

## 👥 Contributors

[Your Team Here]

## 🙏 Acknowledgments

- Supabase for the amazing backend platform
- React team for the excellent framework
- Vercel for reliable hosting
- All open-source contributors

---

**Version**: 1.0.0
**Last Updated**: 2024-12-24
**Status**: Production Ready ✅

For detailed technical documentation, security guidelines, and operational procedures, please refer to the documentation files listed in the [Documentation](#-documentation) section above.
# Trigger rebuild 1770991163
