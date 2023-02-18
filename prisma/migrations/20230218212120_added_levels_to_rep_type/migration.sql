-- AlterTable
ALTER TABLE `ExerciseTemplate` MODIFY `type` ENUM('lbs', 'seconds', 'bodyWeight', 'levels') NOT NULL DEFAULT 'lbs';
