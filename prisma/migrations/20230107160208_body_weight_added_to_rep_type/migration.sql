-- AlterTable
ALTER TABLE `ExerciseTemplate` MODIFY `type` ENUM('lbs', 'seconds', 'bodyWeight') NOT NULL DEFAULT 'lbs';
