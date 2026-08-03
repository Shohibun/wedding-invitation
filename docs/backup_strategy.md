# Database & Storage Backup Strategy

## 1. Automated Supabase Backups (PITR)
- **Point-In-Time Recovery (PITR)**: Enable PITR in the Supabase Dashboard under Database -> Backups. This guarantees disaster recovery with minute-by-minute granularity up to the retention period (usually 7-30 days based on plan).
- **Daily Physical Backups**: Supabase performs daily physical backups automatically.

## 2. Manual Snapshot Backups (Database)
For external archiving, run logical dumps weekly using `pg_dump`:
```bash
pg_dump "postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:6543/postgres" > backup.sql
```

## 3. Storage Backups
Supabase Storage is backed by S3. While resilient, it's recommended to script a daily sync of all files in production buckets (`invitation-gallery`, `invitation-media`, etc.) to a cold-storage AWS S3 bucket:
```bash
# Example AWS CLI sync (Requires custom script to read from Supabase Storage API)
aws s3 sync s3://supabase-storage-bucket/ s3://your-cold-backup-bucket/
```

## 4. Disaster Recovery Procedure
1. Create a new Supabase Project.
2. Run database migrations to restore schema structure.
3. Import the latest logical backup (`backup.sql`) via `psql`.
4. Restore objects into the Storage buckets.
5. Update Vercel environment variables with the new project URLs and keys.
6. Trigger a new Vercel deployment.
